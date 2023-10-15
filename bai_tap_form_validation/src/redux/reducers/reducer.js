import { ReactFormConst } from "./const";

const stateDefault = {
    listProduct: [],
    productEdit: null,
    mangTK: []
}

export const reactFormReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case ReactFormConst.Submit: {
            const newListProduct = [...state.listProduct];
            newListProduct.push(action.payload);
            state.listProduct = newListProduct;
            return { ...state };
        }

        case ReactFormConst.Delete: {
            // console.log(action.payload);
            const newListProduct = state.listProduct.filter((sv) => sv.maSV !== action.payload)
            state.listProduct = newListProduct;
            return { ...state }
        }
        case ReactFormConst.Edit: {
            state.productEdit = action.payload
            return { ...state }
        }
        case ReactFormConst.Update: {
            const newListProduct = [...state.listProduct]
            const index = state.listProduct.findIndex((sv) => sv.maSV === action.payload.maSV)
            newListProduct.splice(index, 1, action.payload)
            state.listProduct = newListProduct;
            state.productEdit = null
            return { ...state }
        }
        case ReactFormConst.Search: {
           
            if (action.payload === "") {
                state.mangTK = []
            } else {
                let mangTK = []
                let tuTKxoaSpace = (action.payload).toLowerCase().replace(/\s/g, "");

                state.listProduct.map((sv) => {
                    let indexTK = sv.name.toLowerCase().replace(/\s/g, "").indexOf(tuTKxoaSpace)

                    if (indexTK > -1) {
                        mangTK.push(sv)
                    }
                })
                state.mangTK = mangTK;
            }


            return { ...state }
        }
        default:
            return state;
    }
};