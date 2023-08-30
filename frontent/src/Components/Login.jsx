import { useFormik } from "formik"
import { useLoginMutation } from "../service/api"
import * as Yup from 'yup'
import Cookie from 'js-cookie'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { toast } from "react-toastify"

export const Login = () => {

    const [login] = useLoginMutation()
    const navigate = useNavigate()

    useEffect(() => {
        Cookie.remove('token')
    }, [])

    const resumeSchema = Yup.object({
        email: Yup.string().email().required("Please enter your email"),
        password: Yup.string().required("Please enter your password")
    })

    const initialValues = {
        email: "",
        password: ""
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: resumeSchema,
        onSubmit: async (values, action) => {
            const res = await login(values)
            if (res.data.status === "success") {
                Cookie.set('token', res.data.token)
                toast.success('Login success', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                navigate('/forms')
            } else {
                toast.error('Email or password is wrong', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            action.resetForm()
        }
    })


    return (
        <>
            <form onSubmit={handleSubmit} className="container mt-5">
                <h1>Login to see all the submitted forms</h1>
                <div className="mb-3 mt-5">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" value={values.email} onBlur={handleBlur} onChange={handleChange} id="email" aria-describedby="email" />
                    {errors.email && touched.email ? (
                        <p className="form-error">{errors.email}</p>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={values.password} onBlur={handleBlur} onChange={handleChange} id="password" />
                    {errors.password && touched.password ? (
                        <p className="form-error">{errors.password}</p>
                    ) : null}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}
