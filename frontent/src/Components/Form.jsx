import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSubmitFormMutation } from '../service/api'
import { toast } from 'react-toastify'

export const Form = () => {

    const [submitForm, { isLoading }] = useSubmitFormMutation()

    const resumeSchema = Yup.object({
        name: Yup.string().min(2).max(25).required("Please enter your name"),
        email: Yup.string().email().required("Please enter your email"),
        mobile: Yup.string().min(10).max(13).required("Please enter your mobile number"),
        resume: Yup.string().required("Please enter your resume link"),
        cgpa: Yup.number().max(10).required("Please enter your cgpa"),
        department: Yup.string().required("Please enter your relevant department")
    })

    const initialValues = {
        name: "",
        email: "",
        mobile: "",
        resume: "",
        cgpa: "",
        department: ""
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: resumeSchema,
        onSubmit: async (values, action) => {
            const res = await submitForm(values)
            if (res.data.message === "Form submitted successfully") {
                toast.success('Form submitted successfully', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                action.resetForm()
            } else {
                toast.error('Error occurred, please try again!', {
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
        }
    })

    return (
        <>
            {isLoading ? "Loading" : <form className="container mt-5" onSubmit={handleSubmit}>
                <h1>Upload your details here for any type of department</h1>
                <div className="mb-3 mt-5">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={values.name} onChange={handleChange} onBlur={handleBlur} name="name" aria-describedby="name" />
                    {errors.name && touched.name ? (
                        <p className="form-error">{errors.name}</p>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={values.email} onChange={handleChange} onBlur={handleBlur} name="email" aria-describedby="email" />
                    {errors.email && touched.email ? (
                        <p className="form-error">{errors.email}</p>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">Mobile Number</label>
                    <input type="text" className="form-control" id="mobile" value={values.mobile} onChange={handleChange} onBlur={handleBlur} name="mobile" aria-describedby="mobile" />
                    {errors.mobile && touched.mobile ? (
                        <p className="form-error">{errors.mobile}</p>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="resume" className="form-label">Resume link</label>
                    <input type="text" className="form-control" id="resume" value={values.resume} onChange={handleChange} onBlur={handleBlur} name="resume" aria-describedby="resume" />
                    {errors.resume && touched.resume ? (
                        <p className="form-error">{errors.resume}</p>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="cgpa" className="form-label">CGPA</label>
                    <input type="number" className="form-control" id="cgpa" value={values.cgpa} onChange={handleChange} onBlur={handleBlur} name="cgpa" aria-describedby="cgpa" />
                    {errors.cgpa && touched.cgpa ? (
                        <p className="form-error">{errors.cgpa}</p>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="department" className="form-label">Department</label>
                    <input type="text" className="form-control" id="department" value={values.department} onChange={handleChange} onBlur={handleBlur} name="department" aria-describedby="department" />
                    {errors.department && touched.department ? (
                        <p className="form-error">{errors.department}</p>
                    ) : null}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>}
        </>
    )
}
