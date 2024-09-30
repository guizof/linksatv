import { createContext, useState } from "react";

export const AppContext = createContext();
export const AppProvider = ({ children }) => {
    const [carrinho, setCarrinho] = useState([]);
    const [lanches, setLanches] = useState(
        [
            {
                "id": 1,
                "nome": "Hamburguer",
                "local": "Burgao Top",
                "preco": 27.90,
                "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8j92wSHHVCzQQszVM-R-23y-3jMo_qB9YUA&s"
            },
            {
                "id": 2,
                "nome": "Hot Dog",
                "local": "Dogão do Luís",
                "preco": 15.90,
                "img": "https://www.ancoranoticias.com.br/images/noticias/16172/72a2989f308dec5ec5dc91bc0a946be1.jpeg",
            },
            {
                "id": 3,
                "nome": "Sorvete",
                "local": "Gelin",
                "preco": 7.99,
                "img": "https://agoranovale.com.br/wp-content/uploads/2024/09/sorvete-FreePik.jpg.webp"
            }
        ]
    );

    return <AppContext.Provider value={{ carrinho, setCarrinho, lanches, setLanches }}>
        {children}
    </AppContext.Provider>;
}