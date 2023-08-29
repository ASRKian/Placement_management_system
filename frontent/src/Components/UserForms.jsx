import Cookie from 'js-cookie'
import { useEffect, useState } from 'react'
import { useGetFormsMutation } from '../service/api'
import { useNavigate } from 'react-router-dom'

export default function UserForms() {

    const [data, setData] = useState([])
    const navigate = useNavigate()

    const [getForms, { isLoading }] = useGetFormsMutation()
    useEffect(() => {
        (async () => {
            const token = Cookie.get('token')
            if (token) {
                try {
                    const res = await getForms(token)
                    console.log(res);
                    setData(res.data)
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log('user not found');
                navigate('/login')
            }
        })()
    }, [])


    return (
        <table className="table table-striped container mt-5">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th className="table-data-none">Resume</th>
                    <th className="table-data-none">cgpa</th>
                    <th>department</th>
                </tr>
            </thead>
            <tbody>
                {
                   !isLoading && data?.map((user) => {
                        return <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>{user.resume}</td>
                            <td>{user.cgpa}</td>
                            <td>{user.department}</td>
                            </tr>
                    })
                }
            </tbody >
        </table>
    )
}
