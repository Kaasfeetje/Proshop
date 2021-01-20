import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function SearchBox({ history, location }) {
    const [keyword, setKeyword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            if (location.pathname.startsWith("/admin/orderlist")) {
                history.push(`/admin/orderlist/search/${keyword}`);
            } else {
                history.push(`/search/${keyword}`);
            }
        } else {
            if (location.pathname.startsWith("/admin/orderlist")) {
                history.push(`/admin/orderlist`);
            } else {
                history.push("/");
            }
        }
    };

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder={
                    location.pathname.startsWith("/admin/orderlist")
                        ? "Search users..."
                        : "Search products..."
                }
                className="mr-sm-2 ml-sm-5"
            ></Form.Control>
            <Button type="submit" variant="outline-success" className="p-2">
                Search
            </Button>
        </Form>
    );
}

export default SearchBox;
