const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')

const nextConfig = {
  build: {
    env: {
      NPM_ONLY_PRODUCTION: 1
    }
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/dogs',
  //     },
  //   ]
  // },
  images: {
    domains: ['www.thecocktaildb.com','thecocktaildb.com','images.dog.ceo']
  }
}

module.exports = withPlugins([[withImages]], nextConfig)
