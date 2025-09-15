import dados from "./../models/dados.js";

const { carros } = dados;


const getCarrosByid = (req, res) => {
    const id = parseInt(req.params.id);

    const carro = carros.find((c) => c.id === id);

    if (carro) {
        res.status(200).json(carro);
    } else {
        res.status(404).json({
            erro: `Barbie com id ${id} não encontrado`,
        });
    }
};

const createCarro = (req, res) => {
    const { nome, modelo, ano, cor, qtdeVitorias } = req.body;

    if (!nome || !modelo || !ano || !cor || !qtdeVitorias) {
        return resizeTo.status(400).json({
            sucess: false,
            message: "Nome, modelo, ano, cor e quantidade de vitórias são obrigatórios",
        });
    }

    const novoCarro = {
        id: carros.length + 1,
        nome,
        modelo,
        ano,
        cor, 
        qtdeVitorias
    };

    carros.push(novoCarro);

    res.status(201).json({
        sucess: true,
        message: "Carro Cadastrado com sucesso!",
        carro: novoCarro
    });
};

const deleteCarro = (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({
            sucess: false,
            message: "ID deve ser um número válido"
        });
    }

    const idParaApagar = parseInt(id);

    const carroParaRemover = carros.find((c) => c.id === idParaApagar);
    if (!carroParaRemover) {
        return res.status(404).json({
            sucess: false,
            message: `Carro com ID ${id} não encontrado para remoção!`
        });
    }

    const carrosFiltrados = carros.filter((carro) => carro.id !== idParaApagar);
    
    carros.splice(0, carros.length, ...carrosFiltrados);

    res.status(200).json({
        sucess: true,
        message: `${carroParaRemover.nome} (ID: ${id}) foi removido dos registros do Mundo Carros)`,
        carroRemovido: carroParaRemover,
    });
}

const updateCarro = (req, res) => {

    const id = parseInt(req.params.id);
    const { nome, modelo, ano, cor, qtdeVitorias } = req.body;

    const idParaEditar = id;

    if (isNaN(idParaEditar)) {
        return res.status(400).json({
            sucess: false,
            message: "O Id deve ser um número válido",
        });
    };

    const carroExiste = carros.find((c) => c.id === idParaEditar);
    if (!carroExiste) {
        return res.status(404).json({
            sucess: false,
            message: `O carro com o ID: ${idParaEditar} não existe`
        });
    }

    const carroAtualizados = carros.map(c => c.id === idParaEditar ? {
        ...c,
        ...(nome && { nome }),
        ...(modelo && { modelo }),
        ...(ano && { ano: parseInt(ano) }),
        ...(cor && { cor }),
        ...(qtdeVitorias && { qtdeVitorias: parseInt(qtdeVitorias) }),
    }
    : c

);

carros.splice(0, carros.length, ...carroAtualizados);

const carroEditado = carros.find(c => c.id === idParaEditar);
res.status(200).json({
    sucess: true,
    message: `Dados do carro atualizados com sucesso`,
    carro: carroEditado
});
}

const filtrarCarros = (req, res) => {
    
    const { nome, modelo, ano, cor, qtdeVitorias, velocidadeMaxima, equipe, tipo } = req.query
    let resultado = carros;

    if (nome) {
      resultado = resultado.filter(c => c.nome.toLowerCase() === nome.toLowerCase());
    }
    if (modelo) {
      resultado = resultado.filter(c => c.modelo.toLowerCase() === modelo.toLowerCase());
    }
  
    if (ano) {
      resultado = resultado.filter(c => c.ano == ano);
    }
  
    if (cor) {
      resultado = resultado.filter(c => c.cor.toLowerCase().includes(cor.toLowerCase()));
    }
  
    if (qtdeVitorias) {
      resultado = resultado.filter(c => c.qtdeVitorias.toLowerCase().includes(qtdeVitorias.toLowerCase()));
    }
    if (velocidadeMaxima) {
      resultado = resultado.filter(c => c.velocidadeMaxima.toLowerCase().includes(velocidadeMaxima.toLowerCase()));
    }
    if (equipe) {
      resultado = resultado.filter(c => c.equipe.toLowerCase().includes(equipe.toLowerCase()));
    }
    if (tipo) {
      resultado = resultado.filter(c => c.tipo.toLowerCase().includes(tipo.toLowerCase()));
    }

    res.status(200).json({
        total: resultado.length,
        data: resultado
    });
}

export { getCarrosByid, createCarro, deleteCarro, updateCarro, filtrarCarros };