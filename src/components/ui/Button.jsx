import React from 'react';

export const Button = ({ children, onClick, type = "button", variant = "primary" }) => {
    const baseStyle = {
        padding: '10px 20px',
        borderRadius: 'var(--radio-borde)',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px',
        transition: 'opacity 0.3s',
    };

    const variants = {
        primary: {
            backgroundColor: 'var(--color-primario)',
            color: 'white',
        },
        secondary: {
            backgroundColor: 'var(--color-secundario)',
            color: 'white',
        }
    };

    return (
        <button
            type={type}
            onClick={onClick}
            style={{ ...baseStyle, ...variants[variant] }}
            onMouseOver={(e) => e.target.style.opacity = 0.8}
            onMouseOut={(e) => e.target.style.opacity = 1}
        >
            {children}
        </button>
    );
};