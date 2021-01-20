import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
function Paginate({
    pages,
    page,
    isAdmin = false,
    keyword = "",
    productList,
    orderList,
}) {
    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                        key={x + 1}
                        to={
                            !isAdmin
                                ? keyword
                                    ? `/search/${keyword}/page/${x + 1}`
                                    : `/page/${x + 1}`
                                : productList
                                ? `/admin/productlist/${x + 1}`
                                : orderList && keyword
                                ? `/admin/orderlist/search/${keyword}/page/${
                                      x + 1
                                  }`
                                : `/admin/orderlist/page/${x + 1}`
                        }
                    >
                        <Pagination.Item active={x + 1 === page}>
                            {x + 1}
                        </Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    );
}

export default Paginate;
