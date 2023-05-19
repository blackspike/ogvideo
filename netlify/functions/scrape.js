import * as cheerio from 'cheerio'
import axios from 'axios'

export async function handler(event, context) {
  try {

    const data = JSON.parse(event.body)
    let url = data.url || 'https://www.blackspike.com/blog/why-we-chose-astro-over-nuxt/'


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
        meta.bg = $('meta[property="theme-color"]').attr('content')

       const bgImage = $('meta[property="og:image"]').attr('content')

       //  If its a relative path try concatenating
       if (!bgImage.startsWith('http')) {
          const realUrl = new URL(url)
          meta.bgImage = realUrl.origin + bgImage
        } else {
          meta.bgImage = bgImage
        }

      })
      .catch((err) => console.error(err))

      // quick hack to fetch and convert remote cors image to base64
      if(meta.bgImage)  {
        const response = await axios(meta.bgImage, { responseType: 'arraybuffer' })
        const buffer64 = Buffer.from(response.data, 'binary').toString('base64')
         meta.bgImage = buffer64
      }

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
