import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { getProductAnalytics } from "../actions/productActions";
import Chart from "../components/Chart";
function AnalyticsPage({ history }) {
    const dispatch = useDispatch();
    const ref = useRef();

    const [width, setWidth] = useState(null);

    const productAnalytics = useSelector((state) => state.productAnalytics);
    const { loading, error, analytics } = productAnalytics;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getProductAnalytics());
        } else {
            history.push("/login");
        }
    }, [dispatch, history, userInfo]);

    useEffect(() => {
        if (ref.current && !width) {
            setWidth(ref.current.offsetWidth);
        }
    }, [ref, width]);

    console.log(ref.current ? ref.current.offsetWidth : "No current");
    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Analytics</h1>
                </Col>
            </Row>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <div ref={ref}>
                        {width && (
                            <Chart
                                analytics={analytics}
                                width={width}
                                height={width / 1.9}
                            />
                        )}
                    </div>
                </>
            )}
        </>
    );
}

export default AnalyticsPage;
