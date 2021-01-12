import React from "react";

function Rating({ value, text, color }) {
    const renderedStars = [1, 2, 3, 4, 5].map((i) => {
        return (
            <span key={i}>
                <i
                    style={{ color }}
                    className={
                        value >= i
                            ? "fas fa-star"
                            : value >= i - 0.5
                            ? "fas fa-star-half-alt"
                            : "far fa-star"
                    }
                />
            </span>
        );
    });

    return (
        <div className="rating">
            {renderedStars}
            <span>{text && text}</span>
        </div>
    );
}

Rating.defaultProps = {
    color: "#f8e825",
};

export default Rating;
