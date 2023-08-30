import Cookie from 'js-cookie'
import { useEffect, useState } from 'react'
import { useGetFormsMutation } from '../service/api'
import { useNavigate } from 'react-router-dom'
import User from './UserForm'
import { toast } from 'react-toastify'

export default function UserForms() {

    const [getForms, { isLoading }] = useGetFormsMutation()
    const [load, setLoad] = useState(false)

    const [data, setData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const token = Cookie.get('token')
            if (token) {
                try {
                    const res = await getForms(token)
                    setData(res.data)
                } catch (error) {
                    console.log(error);
                }
            } else {
                toast.error('Some error occurred, please login again!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                navigate('/login')
            }
        })()
    }, [load])



    return (

        <>
            {
                !isLoading && data?.map((user) => {
                    return !user.selected && <User key={user._id} {...user} setLoad={setLoad} load={load}/>

                })
            }
        </>

    )
}
