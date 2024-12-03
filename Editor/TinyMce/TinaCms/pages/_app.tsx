import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { TinaCMS, TinaProvider, ModalProvider } from 'tinacms'
import { DefaultSeo } from 'next-seo'
import data from '../content/siteConfig.json'
import TagManager from 'react-gtm-module'
import { GlobalStyles, FontLoader } from '@tinacms/styles'
import { BrowserStorageApi } from '../utils/plugins/browser-storage-api/BrowserStorageApi'
import { GithubClient, TinacmsGithubProvider } from 'react-tinacms-github'
import { GlobalStyle } from '../components/styles/GlobalStyle'

const MainLayout = ({ Component, pageProps }) => {
  const tinaConfig = {
    enabled: pageProps.preview,
    apis: {
      github: new GithubClient({
        proxy: '/api/proxy-github',
        authCallbackRoute: '/api/create-github-access-token',
        clientId: process.env.GITHUB_CLIENT_ID,
        baseRepoFullName: process.env.BASE_REPO_FULL_NAME,
      }),
      storage:
        typeof window !== 'undefined'
          ? new BrowserStorageApi(window.localStorage)
          : {},
    },
    sidebar: {
      hidden: true,
      position: 'displace' as any,
    },
    toolbar: {
      hidden: !pageProps.preview,
    },
  }

  const cms = React.useMemo(() => new TinaCMS(tinaConfig), [])

  const enterEditMode = () =>
    fetch(`/api/preview`).then(() => {
      window.location.href = window.location.pathname
    })

  const exitEditMode = () => {
    fetch(`/api/reset-preview`).then(() => {
      window.location.reload()
    })
  }

  const loadFonts = useShouldLoadFont(cms)

  return (
    <TinaProvider cms={cms} styled={false}>
      <GlobalStyles />
      {loadFonts && <FontLoader />}
      <ModalProvider>
        <TinacmsGithubProvider
          enterEditMode={enterEditMode}
          exitEditMode={exitEditMode}
          editMode={pageProps.preview}
          error={pageProps.error}
        >
          <DefaultSeo
            title={data.seoDefaultTitle}
            titleTemplate={'%s | ' + data.title}
            description={data.description}
            openGraph={{
              type: 'website',
              locale: 'en_CA',
              url: data.siteUrl,
              site_name: data.title,
              images: [
                {
                  url: 'https://tinacms.org/img/tina-twitter-share.png',
                  width: 1200,
                  height: 628,
                  alt: `TinaCMS`,
                },
              ],
            }}
            twitter={{
              handle: data.social.twitterHandle,
              site: data.social.twitterHandle,
              cardType: 'summary_large_image',
            }}
          />
          <Head>
            <link rel="shortcut icon" href="/favicon/favicon.ico" />
            <meta name="theme-color" content="#E6FAF8" />
          </Head>
          <GlobalStyle />
          <Component {...pageProps} />
        </TinacmsGithubProvider>
      </ModalProvider>
    </TinaProvider>
  )
}

function useShouldLoadFont(cms: TinaCMS) {
  const [enabled, setEnabled] = React.useState(cms.enabled)

  React.useEffect(() => {
    if (cms.enabled) return
    return cms.events.subscribe('cms:enable', () => {
      setEnabled(true)
    })
  }, [])

  return enabled
}

class Site extends App {
  componentDidMount() {
    if (process.env.NODE_ENV === 'production') {
      TagManager.initialize({
        gtmId: process.env.GTM_ID,
      })
    }
  }

  render() {
    const { Component, pageProps } = this.props
    return <MainLayout Component={Component} pageProps={pageProps} />
  }
}

export default Site
