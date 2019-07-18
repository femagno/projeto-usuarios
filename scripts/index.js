 /* Criação de uma Single Page Aplication (SPA) para gerenciamento de formulários de usuários */


//window.index = new User;

/* inputName = document.querySelector("#exampleInputName");
        checkGender = document.querySelectorAll("#form-user-create [name = gender]:checked"); //Seletor de CSS3
        inputBirth = document.querySelector("#exampleInputBirth");
        inputCountry = document.querySelector("#exampleInputCountry");
        inputEmail = document.querySelector("#exampleInputEmail");
        inputPassword = document.querySelector("#exampleInputPassword");
        inputPicture = document.querySelector("#exampleInputFile");
        enableAdm = document.querySelector("#checkboxAdm"); */

/* document.getElementById("form-user-create").addEventListener("submit", function(event) {
    event.preventDefault(); */ //Cancelar o comportamento padrão desse evento que é recarregar a página ou passar para outra página
    /* Fazer um forEach para percorrer todo o formulário, sem que seja preciso criar variáveis para cada elemento
    do formulário manualmente
    */
    /* var fields = document.querySelectorAll("#form-user-create [name]");
    var dataUser = {}; //Usar notação JASON para guardar as variáveis
    fields.forEach(function(field, index) {
        if(field.name === "gender") {
            if(field.checked) {
                dataUser[field.name] = field.value;
            }
        }
        else {
            dataUser[field.name] = field.value;
        }
    });
    //var objectUser = new User(dataUser.name,
        dataUser.gender,
        dataUser.birth,
        dataUser.country,
        dataUser.email,
        dataUser.password,
        dataUser.photo,
        dataUser.admin);
    addLine(objectUser);
}); */

/* function addLine(dataUser) {
    console.log(dataUser);
    var tableUsers = document.getElementById("table-users");
    tableUsers.innerHTML = `
        <tr>
            <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${dataUser.admin}</td>
            <td>${dataUser.birth}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        </tr>
    `;
    


} */
//, "form-user-update"
let user = new UserController("form-user-create", "form-user-update", "table-users");

