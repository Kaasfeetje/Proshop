import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";

function RegisterPage({ location, history }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.userRegister);

    const { loading, error, userInfo } = userRegister;

    const redirect = location.search ? location.search.split("=")[1] : "/";

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [userInfo, redirect, history]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            setMessage("Passwords do not match");
        } else {
            setMessage(null);
            dispatch(register(name, email, password));
        }
    };

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="passwordConfirm">
                    <Form.Label>Password Confirm</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">
                    Sign In
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                    Have an Account?
                    <Link
                        to={redirect ? `/login?redirect=${redirect}` : "/login"}
                    >
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default RegisterPage;