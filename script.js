function iniciar() {
    listarPessoa();
}

async function listarPessoa() {

    var pessoa = await fetch("php/pessoa_listar.php").then(resposta => {return resposta.json()});
    var tabela = document.getElementById('tabelaPessoa');

    tabela.innerHTML = '';
    for(i = 0; i < pessoa.length; i++){
        tabela.innerHTML += `<tr>
                    <td>${pessoa[i].id_pessoa}</td>
                    <td>${pessoa[i].nome}</td>
                    <td>${pessoa[i].sexo}</td>
                    <td>${pessoa[i].cabelo}</td>
                    <td><img src="${pessoa[i].img}" /></td>

                    <td>
                        <button class="btn btn-success" data-bs-toggle="modal"
                            data-bs-target="#modalPessoa"
                            onclick="procuraPessoa(${pessoa[i].id_pessoa})">Alterar</button>
                    </td>
                    <td>
                        <button class="btn btn-danger" onclick="excluirPessoa(${pessoa[i].id_pessoa})">Excluir</button>
                    </td>
                </tr>`;
    }
}

async function updatePessoa(id_pessoa){
    var nome = document.getElementById('nome')
    var sexo = document.getElementById('sexo')
    var cabelo = document.getElementById('cabelo')

    await fetch(`php/pessoa_alterar.php?id_pessoa=${id_pessoa}&nome=${nome.value}&sexo=${sexo.value}&cabelo=${cabelo.value}`);
    iniciar();
}

async function procuraPessoa(id_pessoa){
    var pessoa = await fetch(`php/pessoa_selecionar.php?id_pessoa=${id_pessoa}`).then(resposta => {return resposta.json()});
    var modal = document.getElementById('modalForm');

    for(i = 0; i < pessoa.length; i++){
        modal.innerHTML = `
    
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="tituloPessoa">Inserindo nova pessoa</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form>
                <div class="form-group">
                    <label for="id_pessoa">ID</label>
                    <input type="text" value="${pessoa[i].id_pessoa}"class="form-control" id="id_pessoa" disabled>
                </div>
                <div class="form-group">
                    <label for="nome">Nome da Pessoa</label>
                    <input type="text" value="${pessoa[i].nome}" class="form-control" id="nome">
                </div>
                <div class="form-group">
                    <label for="idade">SEXO</label>
                    <input type="text" value="${pessoa[i].sexo}" class="form-control" id="sexo">
                </div>
                <div class="form-group">
                    <label for="altura">CABELO</label>
                    <input type="text" value="${pessoa[i].cabelo}" class="form-control" id="cabelo">
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-success" data-bs-dismiss="modal" onclick="updatePessoa(${pessoa[i].id_pessoa})">Salvar</button>
        </div>`
    }
}

async function excluirPessoa(id_pessoa){
    await fetch(`php/pessoa_excluir.php?id_pessoa=${id_pessoa}`);

    iniciar()
}

async function importaPessoa(){
    var pessoa = document.getElementById('pessoaProcurada').value

    var res = await fetch(`https://api.fbi.gov/wanted/v1/list?title=${pessoa}`).then(resposta => { return resposta.json() });

    for(i = 0; i < res.items.length; i++){
        var nome = res.items[i].title
        var sexo = res.items[i].sex
        var cabelo = res.items[i].hair
        var img = res.items[i].images[0].thumb

        var importa = await fetch(`php/pessoa_inserir.php?nome=${nome}&sexo=${sexo}&cabelo=${cabelo}&img=${img}`);
    }
    

    iniciar()
}