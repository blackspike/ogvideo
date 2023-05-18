import * as cheerio from 'cheerio'
import axios from 'axios'

export async function handler(event, context) {
  try {
    const url =
      event.queryStringParameters.url ||
      'https://www.blackspike.com/blog/why-we-chose-astro-over-nuxt/'

    const meta = {
      title: '',
      subtitle: '',
      bgImage: '',
      bg: '',
    }

    await axios
      .get(url)
      .then((res) => {
        const $ = cheerio.load(res.data)

        meta.title = $('meta[property="og:title"]').attr('content')
        meta.subtitle = $('meta[property="og:description"]').attr('content')
        meta.bgImage = $('meta[property="og:image"]').attr('content')
        meta.bg = $('meta[property="theme-color"]').attr('content')

      })
      .catch((err) => console.error(err))


    // const response = await axios.get(meta.bg)
    // const blob = await response.blob()
    // const imageFile = URL.createObjectURL(blob)
    // console.log(bgImageUrl)


    return {
      statusCode: 200,
      body: JSON.stringify(meta)
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error })
    }
  }
}
