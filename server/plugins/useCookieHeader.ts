export function useCookieHeader({ req, res }: {req: any, res: any}) {
  const getCookieHeader = () => {
    const cookieRecord: { cookie?: string } = useRequestHeaders(['cookie'])
    const headers = {
      ...(cookieRecord.cookie && { cookie: cookieRecord.cookie }),
    }
    return { headers } 
  }

  const setCookieHeader = ({ req, res }: {req: any, res: any}) => {
    res.setHeader('Set-Cookie', 'foo=bar')
  }
  return {
    useCookieHeader: useCookieHeader,
    setCookieHeader: setCookieHeader
  }
}

export default useCookieHeader;
