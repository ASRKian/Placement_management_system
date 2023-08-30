import Cookies from "js-cookie";
import { useDeleteFormMutation, useSendEmailMutation, useUpdateFormMutation } from "../service/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UserForm({ _id, name, email, mobile, cgpa, resume, department, setLoad, load }) {

    const [sendEmail, { isLoading }] = useSendEmailMutation()
    const [updateForm] = useUpdateFormMutation()
    const [deleteForm] = useDeleteFormMutation()
    const navigate = useNavigate()

    const select = async (e) => {
        e.preventDefault()
        const token = Cookies.get('token')
        if (!token) {
            navigate('/login')
            return
        }
        try {
            const res = await sendEmail({ email, token })
            if (res.data.message === "Email has been sent to the candidate.") {
                const resp = await updateForm({ _id, token })
                toast.success('Email has been sent successfully!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                if (resp.data.message === "form updated successfully") {
                    setLoad(!load)
                } else {
                    toast.error('Some error occurred, please try again later!', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    return
                }
            } else {
                toast.error('Some error occurred, please try again later!', {
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
        } catch (error) {
            toast.error('Some error occurred, please try again later!', {
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

    const removeForm = async (e) => {
        e.preventDefault()
        const token = Cookies.get('token')
        if (token) {
            try {
                const res = await deleteForm({ _id, token })
                if (res.data.message === "form deleted successfully") {
                    setLoad(!load)
                    toast.success('Form deleted successfully', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                } else {
                    toast.error('Some error occurred, please try again later!', {
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
            } catch (error) {
                toast.error('Some error occurred, please try again later!', {
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
        } else {
            navigate('/login')
        }
    }

    return (
        <div className={`col-md-11 m-5 shadow-lg p-3 mb-4 rounded`} style={{ minHeight: "37vh" }} >
            {isLoading ? <div className="spinner"></div> : <>
                <h4>Name: <span className="fs-5">{name}</span></h4>
                <h4>Email: <span className="fs-5">{email}</span></h4>
                <h4>Contact: <span className="fs-5">{mobile}</span></h4>
                <h4>CGPA: <span className="fs-5">{cgpa}</span></h4>
                <h4>Resume Link: <a className="fs-5" href={resume}>{resume}</a> </h4>
                <h4>Department: <span className="fs-5">{department}</span> </h4>
                <button type="button" className="btn btn-primary me-3" onClick={select}>
                    Accept
                    <i className="fa-solid fa-check ms-1"></i>
                </button>
                <button type="button" className="btn btn-danger ms-3" onClick={removeForm}>
                    Reject
                    <i className="fa-solid fa-xmark ms-1"></i>
                </button>
            </>}
        </div>
    )
}