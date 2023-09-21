import React from 'react';

export interface BlockProps {
    initialized: boolean;
    children?: React.ReactNode;
}

export const Block = ({ initialized, children }: BlockProps) => (
    initialized && children
        // eslint-disable-next-line react/jsx-no-useless-fragment
        ? <>{children}</>
        : <span>Loading...</span>
);
