import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppSelector } from '../../store/hooks'

const withAuthentication = (Component) => {
    const Authenticated = () => {
        const { token } = useAppSelector((state) => state.persistedReducer.auth)
        const router = useRouter()

        useEffect(() => {
            if (!token) router.push('/auth')
        }, [token, router])

        return token ? <Component /> : null
    }

    return Authenticated
}

export default withAuthentication
