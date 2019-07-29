class UserController {
    constructor(formId, formIdUpdate, tableId) {
        this.formEl = document.getElementById(formId);
        this.formUpdateEl = document.querySelector(formIdUpdate);
        this.tableEl = document.getElementById(tableId);
        this.onSubmit();
        this.onEditCancel();
    }

    onEditCancel() {
        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e => {
            this.showPanelCreate();
        });
    }

    onSubmit() {
        this.formEl.addEventListener("submit", event => {
            event.preventDefault();
            let btnSubmit = this.formEl.querySelector("[type=submit]");
            btnSubmit.disable = true;
            let values = this.getValues(); //Usar API FileRead
            if(!values) {
                return false;
            }
            this.getPhoto().then(
                (content) => {
                    values.photo = content;
                    this.addLine(values);
                    this.formEl.reset();
                    btnSubmit.disable = false;
                }, 
                (e) => {
                    console.error(e);
                }
            );
            /* this.getPhoto((content) => {
                values.photo = content;
                this.addLine(values);
            }); */            
 
        });
    }

    getPhoto() {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            let elements = [...this.formEl.elements].filter(item => {
                if (item.name === 'photo') {
                    return item;
                }
            });
            let file = elements[0].files[0];
            fileReader.onload  = () => {
                let resultFile = fileReader.result; //Base64
                resolve(resultFile);
            };
            fileReader.onerror = (e) => {
                reject(e);
            }
            if (file) {
                fileReader.readAsDataURL(file);
            }
            else {
                resolve('dist/img/boxed-bg.jpg');
            }

        });
        
    }

    getValues() {
        let dataUser = {};
        let isValid = true;
        //console.log(this.formEl.elements);
        [...this.formEl.elements].forEach(function(field, index) {
            if((['name', 'email', 'password'].indexOf(field.name) > -1) && !field.value ) {
                field.parentElement.classList.add("has-error");
                isValid = false;
                return false;
            }
            
            if(field.name === "gender") {
                if(field.checked) {
                    dataUser[field.name] = field.value;
                }
            }
           /*  else if(field.name === "admin") {
                dataUser[field.name] = field.checked;
                if (field.checked == true) {
                    dataUser[field.name] = "Sim";
                }
                else {
                    dataUser[field.name] = "Não"; 
                }
                
            } */
            else {
                dataUser[field.name] = field.value;
            }
        });
        if (!isValid) {
            return false;
        }
        return new User(dataUser.name,
            dataUser.gender,
            dataUser.birth,
            dataUser.country,
            dataUser.email,
            dataUser.password,
            dataUser.photo,
            dataUser.admin
        );

    }

    addLine(dataUser) {
        let tr = document.createElement('tr');
        tr.dataset.user = JSON.stringify(dataUser); //Serialização: Transfoema um objeto em string
        tr.innerHTML = `
                <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${(dataUser.admin ? "Sim": "Não")}</td>
                <td>${Utils.dateFormat(dataUser.register)}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
        `;
        tr.querySelector(".btn-edit").addEventListener("click", e => {
            console.log(JSON.parse(tr.dataset.user));
            let json = JSON.parse(tr.dataset.user);
            //let boxUpdateEl = document.getElementById("box-user-update");
 
            for (let name in json){
                let field = this.formUpdateEl.querySelector("[ name=" + name.replace("_", "") + " ]");
                //let field = this.formUpdateEl.getElementById(name.replace("_", ""));
                console.log(field);
                /* if(field)
                {
                    switch (field.type) {
                        case 'file':
                        continue;
                        break;

                        case 'radio':
                            field = this.formUpdateEl.querySelector("[name=" + name.replace("_", "") + "][value=" + json[name] + "]");
                            field.checked = true;
                            break;

                        case 'checkbox':
                            field.checked = json[name];
                            break;
                        default:
                            field.value = json[name];
                } // Fechando switch fild
                
            } // Fechando if field */
                //field.value = json[name];
            } // Fechando for json 
            this.showPanelUpdate();
        });
   
        this.tableEl.appendChild(tr);
        
        this.updateCount();
        
    }

    showPanelCreate() {
        document.querySelector("#box-user-create").style.display = "block";
        document.querySelector("#box-user-update").style.display = "none";
    }

    showPanelUpdate() {
        document.querySelector("#box-user-create").style.display = "none";
        document.querySelector("#box-user-update").style.display = "block";
    }

    updateCount() {
        let numberUsers = 0;
        let numberAdmin = 0;
        [...this.tableEl.children].forEach(tr => {
            numberUsers++
            let user = JSON.parse(tr.dataset.user);
            if(user._admin) {
                numberAdmin++
            }
        });
        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admin").innerHTML = numberAdmin;
    }
}