import { AuthTokenError } from '@/services/errors/AuthTokenError'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { parseCookies, destroyCookie } from 'nookies'

export function canSSRAuth<p>(fn: GetServerSideProps<p>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<p>> => {
    const cookies = parseCookies(ctx)

    if (!cookies['@nextauth.token']) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
    try {
      return await fn(ctx)
    } catch (error) {
      if (error instanceof AuthTokenError) {
        destroyCookie(ctx, '@nextauth.token')

        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        }
      }
    }
  }
}
