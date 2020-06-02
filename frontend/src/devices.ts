export const size = {
    XS_SIZE: "600px",
    S_SIZE: "600px",
    M_SIZE: "768px",
    L_SIZE: "992px",
    XL_SIZE: "1200px"
};

export const devices = {
    XS_BOUND: `(max-width: ${size.XS_SIZE})`,
    S_BOUND: `(min-width: ${size.S_SIZE} and (max-width: ${size.M_SIZE})`,
    M_BOUND: `(min-width: ${size.M_SIZE}) and (max-width: ${size.L_SIZE})`,
    L_BOUND: `(min-width: ${size.L_SIZE}) and (max-width: ${size.XL_SIZE})`,
    XL_BOUND: `(min-width: ${size.XL_SIZE})`,
    XS_UPPER: `(max-width: ${size.XS_SIZE})`,
    S_UPPER: `(max-width: ${size.M_SIZE})`,
    M_UPPER: `(max-width: ${size.L_SIZE})`,
    L_UPPER: `(max-width: ${size.XL_SIZE})`,
    XL_UPPER: `(min-width: ${size.XL_SIZE})`
};
