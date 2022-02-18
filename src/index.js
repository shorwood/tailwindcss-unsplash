const moduleExists = path => {
  try {
      require.resolve(path);
      return true
  } catch (e) { return false }
}

const plugin = moduleExists('windicss/plugin')
  ? require('windicss/plugin')
  : require('tailwindcss/plugin')

/**
 * Get the URL of an unsplash.com image from it's id.
 * @param {string} id Image id
 * @param {number} w Required resolution
 */
 const createUnslashUrl = (id, w) => {
  const resArg = w ? `?w=${w}` : ''
  return id.length === 11
    ? `https://unsplash.com/photos/${id}/download${resArg}`
    : `https://images.unsplash.com/photo-${id}${resArg}`
}

const unsplash = plugin(({ addDynamic, addUtilities, matchUtilities, theme }) => {

    // --- Get theme.
    const unsplashImages = theme('unsplashImages', {})
    const unsplashResolutions = theme('unsplashResolutions', { default: 1280 })

    // --- WindiCSS
    if(addDynamic) {
      addDynamic('bg-unsplash', ({ Utility, Style }) => {

        // --- Handle dynamic prop.
        const url = Utility.handler
          .handleStatic(unsplashImages)
          .handleString(str => {
            const [_, id, w] = str.split('-')
            return createUnslashUrl(id, unsplashResolutions[w] ?? w)
          })
          .value
        if (!url) return
        return Style.generate(Utility.class, { backgroundImage: `url(${url})` })
      }, {
        layer: 'components',
        group: 'backgroundImage',
        completions: [
          ...Object.keys(unsplashImages).map(i => `bg-unsplash-${i}`),
          'bg-unsplash-{string}',
          'bg-unsplash-{string}-{number}',
        ],
      })
    }

    // --- TailwindCSS
    else if(matchUtilities) {

        // --- Add dynamic utility. (example: '.bg-unslash-[4987wa34_q/640]')
        matchUtilities({
          'bg-unsplash': value => {
            const [id, w] = value.split('/').map((x) => x.trim().replaceAll(' ', '_'))
            const url = createUnslashUrl(id, unsplashResolutions[w] ?? w)
            return { backgroundImage: `url(${url})` }
          },
        })

        // --- Add semi-dynamic utilities. (example: '.bg-unslash-foobar-[640]').
        for (const imageKey in unsplashImages) {

          // --- Get theme value.
          const id = unsplashImages[imageKey]

          // --- Add static utility
          matchUtilities({
            [`bg-unsplash-${imageKey}`]: value => {
              return { backgroundImage: `url(${createUnslashUrl(id, value)})` }
            },
          })
        }
    }

    // --- Add static utilities.
    for (const imageKey in unsplashImages) {
      for (const resKey in unsplashResolutions) {

        // --- Get theme value.
        const id = unsplashImages[imageKey]
        const w = unsplashResolutions[resKey]

        // --- Add static utility
        addUtilities({
          [`.bg-unsplash-${imageKey}${resKey === 'default' ? '' : '-' + resKey}`]: {
            backgroundImage: `url(${createUnslashUrl(id, w)})`
          }
        })
      }
    }
  },

  // --- Define default theme.
  {
    theme: {
      unsplashImages: {
        lyon: 'YMi66afAE3I',
        stars: '4dpAqfTbvKA',
        yosemite: 'zOXUvQ3Xo3s',
        gradient: 'LeG68PrXA6Y',
      },

      unsplashResolutions: {
        default: null,
        xs: 480,
        sm: 720,
        md: 1280,
        lg: 1920,
        xl: 3840,
        '2xl': 7680,
      },
    },
  }
)

module.exports = unsplash