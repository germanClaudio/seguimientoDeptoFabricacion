async function switchFilterUsers(filter, Usuarios, nameAndOthersQueries) {
    switch(filter) {
        case 'filterFor--todos-todos-todos-todos': {
            var resultados = ['vacio'];
            break;
        }
        case 'filterFor--todos-todos-todos-diseno': {
            var queryObj = {"permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-todos-simulacion': {
            var queryObj = {"permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-todos-disenoSimulacion': {
            var queryObj = {"permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-todos-projectManager': {
            var queryObj = {"permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-todos-cadCam': {
            var queryObj = {"permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-todos-mecanizado': {
            var queryObj = {"permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-todos-ajuste': {
            var queryObj = {"permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-ingenieria-todos': {
            var queryObj = {"area":"ingenieria"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-ingenieria-diseno': {
            var queryObj = {"area":"ingenieria","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-ingenieria-simulacion': {
            var queryObj = {"area":"ingenieria","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-ingenieria-disenoSimulacion': {
            var queryObj = {"area":"ingenieria","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-ingenieria-projectManager': {
            var queryObj = {"area":"ingenieria","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-ingenieria-cadCam': {
            var queryObj = {"area":"ingenieria","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-ingenieria-mecanizado': {
            var queryObj = {"area":"ingenieria","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-ingenieria-ajuste': {
            var queryObj = {"area":"ingenieria","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-fabricacion-todos': {
            var queryObj = {"area":"fabricacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-fabricacion-diseno': {
            var queryObj = {"area":"fabricacion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-fabricacion-simulacion': {
            var queryObj = {"area":"fabricacion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-fabricacion-disenoSimulacion': {
            var queryObj = {"area":"fabricacion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-fabricacion-projectManager': {
            var queryObj = {"area":"fabricacion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-fabricacion-cadCam': {
            var queryObj = {"area":"fabricacion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-fabricacion-mecanizado': {
            var queryObj = {"area":"fabricacion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-fabricacion-ajuste': {
            var queryObj = {"area":"fabricacion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-proyectos-todos': {
            var queryObj = {"area":"proyectos"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-proyectos-diseno': {
            var queryObj = {"area":"proyectos","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-proyectos-simulacion': {
            var queryObj = {"area":"proyectos","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-proyectos-disenoSimulacion': {
            var queryObj = {"area":"proyectos","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-proyectos-projectManager': {
            var queryObj = {"area":"proyectos","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-proyectos-cadCam': {
            var queryObj = {"area":"proyectos","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-proyectos-mecanizado': {
            var queryObj = {"area":"proyectos","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-proyectos-ajuste': {
            var queryObj = {"area":"proyectos","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-administracion-todos': {
            var queryObj = {"area":"administracion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-administracion-diseno': {
            var queryObj = {"area":"administracion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-administracion-simulacion': {
            var queryObj = {"area":"administracion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-administracion-disenoSimulacion': {
            var queryObj = {"area":"administracion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-administracion-projectManager': {
            var queryObj = {"area":"administracion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-administracion-cadCam': {
            var queryObj = {"area":"administracion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-administracion-mecanizado': {
            var queryObj = {"area":"administracion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-todos-administracion-ajuste': {
            var queryObj = {"area":"administracion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-todos-todos': {
            var queryObj = {"admin":true};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-todos-diseno': {
            var queryObj = {"admin":true,"permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-todos-simulacion': {
            var queryObj = {"admin":true,"permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-todos-disenoSimulacion': {
            var queryObj = {"admin":true,"permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-todos-projectManager': {
            var queryObj = {"admin":true,"permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-todos-cadCam': {
            var queryObj = {"admin":true,"permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-todos-mecanizado': {
            var queryObj = {"admin":true,"permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-todos-ajuste': {
            var queryObj = {"admin":true,"permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-ingenieria-todos': {
            var queryObj = {"admin":true,"area":"ingenieria"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-ingenieria-diseno': {
            var queryObj = {"admin":true,"area":"ingenieria","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-ingenieria-simulacion': {
            var queryObj = {"admin":true,"area":"ingenieria","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-ingenieria-disenoSimulacion': {
            var queryObj = {"admin":true,"area":"ingenieria","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-ingenieria-projectManager': {
            var queryObj = {"admin":true,"area":"ingenieria","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-ingenieria-cadCam': {
            var queryObj = {"admin":true,"area":"ingenieria","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-ingenieria-mecanizado': {
            var queryObj = {"admin":true,"area":"ingenieria","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-ingenieria-ajuste': {
            var queryObj = {"admin":true,"area":"ingenieria","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-fabricacion-todos': {
            var queryObj = {"admin":true,"area":"fabricacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-fabricacion-diseno': {
            var queryObj = {"admin":true,"area":"fabricacion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-fabricacion-simulacion': {
            var queryObj = {"admin":true,"area":"fabricacion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-fabricacion-disenoSimulacion': {
            var queryObj = {"admin":true,"area":"fabricacion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-fabricacion-projectManager': {
            var queryObj = {"admin":true,"area":"fabricacion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-fabricacion-cadCam': {
            var queryObj = {"admin":true,"area":"fabricacion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-fabricacion-mecanizado': {
            var queryObj = {"admin":true,"area":"fabricacion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-fabricacion-ajuste': {
            var queryObj = {"admin":true,"area":"fabricacion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-proyectos-todos': {
            var queryObj = {"admin":true,"area":"proyectos"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-proyectos-diseno': {
            var queryObj = {"admin":true,"area":"proyectos","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-proyectos-simulacion': {
            var queryObj = {"admin":true,"area":"proyectos","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-proyectos-disenoSimulacion': {
            var queryObj = {"admin":true,"area":"proyectos","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-proyectos-projectManager': {
            var queryObj = {"admin":true,"area":"proyectos","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-proyectos-cadCam': {
            var queryObj = {"admin":true,"area":"proyectos","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-proyectos-mecanizado': {
            var queryObj = {"admin":true,"area":"proyectos","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-proyectos-ajuste': {
            var queryObj = {"admin":true,"area":"proyectos","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-administracion-todos': {
            var queryObj = {"admin":true,"area":"administracion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-administracion-diseno': {
            var queryObj = {"admin":true,"area":"administracion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-administracion-simulacion': {
            var queryObj = {"admin":true,"area":"administracion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-administracion-disenoSimulacion': {
            var queryObj = {"admin":true,"area":"administracion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-administracion-projectManager': {
            var queryObj = {"admin":true,"area":"administracion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-administracion-cadCam': {
            var queryObj = {"admin":true,"area":"administracion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-administracion-mecanizado': {
            var queryObj = {"admin":true,"area":"administracion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-true-administracion-ajuste': {
            var queryObj = {"admin":true,"area":"administracion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-todos-todos': {
            var queryObj = {"admin":false};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-todos-diseno': {
            var queryObj = {"admin":false,"permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-todos-simulacion': {
            var queryObj = {"admin":false,"permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-todos-disenoSimulacion': {
            var queryObj = {"admin":false,"permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-todos-projectManager': {
            var queryObj = {"admin":false,"permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-todos-cadCam': {
            var queryObj = {"admin":false,"permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-todos-mecanizado': {
            var queryObj = {"admin":false,"permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-todos-ajuste': {
            var queryObj = {"admin":false,"permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-ingenieria-todos': {
            var queryObj = {"admin":false,"area":"ingenieria"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-ingenieria-diseno': {
            var queryObj = {"admin":false,"area":"ingenieria","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-ingenieria-simulacion': {
            var queryObj = {"admin":false,"area":"ingenieria","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-ingenieria-disenoSimulacion': {
            var queryObj = {"admin":false,"area":"ingenieria","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-ingenieria-projectManager': {
            var queryObj = {"admin":false,"area":"ingenieria","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-ingenieria-cadCam': {
            var queryObj = {"admin":false,"area":"ingenieria","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-ingenieria-mecanizado': {
            var queryObj = {"admin":false,"area":"ingenieria","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-ingenieria-ajuste': {
            var queryObj = {"admin":false,"area":"ingenieria","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-fabricacion-todos': {
            var queryObj = {"admin":false,"area":"fabricacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-fabricacion-diseno': {
            var queryObj = {"admin":false,"area":"fabricacion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-fabricacion-simulacion': {
            var queryObj = {"admin":false,"area":"fabricacion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-fabricacion-disenoSimulacion': {
            var queryObj = {"admin":false,"area":"fabricacion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-fabricacion-projectManager': {
            var queryObj = {"admin":false,"area":"fabricacion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-fabricacion-cadCam': {
            var queryObj = {"admin":false,"area":"fabricacion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-fabricacion-mecanizado': {
            var queryObj = {"admin":false,"area":"fabricacion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-fabricacion-ajuste': {
            var queryObj = {"admin":false,"area":"fabricacion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-proyectos-todos': {
            var queryObj = {"admin":false,"area":"proyectos"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-proyectos-diseno': {
            var queryObj = {"admin":false,"area":"proyectos","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-proyectos-simulacion': {
            var queryObj = {"admin":false,"area":"proyectos","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-proyectos-disenoSimulacion': {
            var queryObj = {"admin":false,"area":"proyectos","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-proyectos-projectManager': {
            var queryObj = {"admin":false,"area":"proyectos","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-proyectos-cadCam': {
            var queryObj = {"admin":false,"area":"proyectos","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-proyectos-mecanizado': {
            var queryObj = {"admin":false,"area":"proyectos","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-proyectos-ajuste': {
            var queryObj = {"admin":false,"area":"proyectos","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-administracion-todos': {
            var queryObj = {"admin":false,"area":"administracion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-administracion-diseno': {
            var queryObj = {"admin":false,"area":"administracion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-administracion-simulacion': {
            var queryObj = {"admin":false,"area":"administracion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-administracion-disenoSimulacion': {
            var queryObj = {"admin":false,"area":"administracion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-administracion-projectManager': {
            var queryObj = {"admin":false,"area":"administracion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-administracion-cadCam': {
            var queryObj = {"admin":false,"area":"administracion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-administracion-mecanizado': {
            var queryObj = {"admin":false,"area":"administracion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--todos-false-administracion-ajuste': {
            var queryObj = {"admin":false,"area":"administracion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-todos-todos': {
            var queryObj = {"status":true};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-todos-diseno': {
            var queryObj = {"status":true,"permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-todos-simulacion': {
            var queryObj = {"status":true,"permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-todos-disenoSimulacion': {
            var queryObj = {"status":true,"permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-todos-projectManager': {
            var queryObj = {"status":true,"permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-todos-cadCam': {
            var queryObj = {"status":true,"permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-todos-mecanizado': {
            var queryObj = {"status":true,"permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-todos-ajuste': {
            var queryObj = {"status":true,"permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-ingenieria-todos': {
            var queryObj = {"status":true,"area":"ingenieria"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-ingenieria-diseno': {
            var queryObj = {"status":true,"area":"ingenieria","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-ingenieria-simulacion': {
            var queryObj = {"status":true,"area":"ingenieria","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-ingenieria-disenoSimulacion': {
            var queryObj = {"status":true,"area":"ingenieria","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-ingenieria-projectManager': {
            var queryObj = {"status":true,"area":"ingenieria","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-ingenieria-cadCam': {
            var queryObj = {"status":true,"area":"ingenieria","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-ingenieria-mecanizado': {
            var queryObj = {"status":true,"area":"ingenieria","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-ingenieria-ajuste': {
            var queryObj = {"status":true,"area":"ingenieria","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-fabricacion-todos': {
            var queryObj = {"status":true,"area":"fabricacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-fabricacion-diseno': {
            var queryObj = {"status":true,"area":"fabricacion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-fabricacion-simulacion': {
            var queryObj = {"status":true,"area":"fabricacion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-fabricacion-disenoSimulacion': {
            var queryObj = {"status":true,"area":"fabricacion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-fabricacion-projectManager': {
            var queryObj = {"status":true,"area":"fabricacion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-fabricacion-cadCam': {
            var queryObj = {"status":true,"area":"fabricacion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-fabricacion-mecanizado': {
            var queryObj = {"status":true,"area":"fabricacion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-fabricacion-ajuste': {
            var queryObj = {"status":true,"area":"fabricacion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-proyectos-todos': {
            var queryObj = {"status":true,"area":"proyectos"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-proyectos-diseno': {
            var queryObj = {"status":true,"area":"proyectos","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-proyectos-simulacion': {
            var queryObj = {"status":true,"area":"proyectos","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-proyectos-disenoSimulacion': {
            var queryObj = {"status":true,"area":"proyectos","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-proyectos-projectManager': {
            var queryObj = {"status":true,"area":"proyectos","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-proyectos-cadCam': {
            var queryObj = {"status":true,"area":"proyectos","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-proyectos-mecanizado': {
            var queryObj = {"status":true,"area":"proyectos","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-proyectos-ajuste': {
            var queryObj = {"status":true,"area":"proyectos","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-administracion-todos': {
            var queryObj = {"status":true,"area":"administracion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-administracion-diseno': {
            var queryObj = {"status":true,"area":"administracion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-administracion-simulacion': {
            var queryObj = {"status":true,"area":"administracion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-administracion-disenoSimulacion': {
            var queryObj = {"status":true,"area":"administracion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-administracion-projectManager': {
            var queryObj = {"status":true,"area":"administracion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-administracion-cadCam': {
            var queryObj = {"status":true,"area":"administracion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-administracion-mecanizado': {
            var queryObj = {"status":true,"area":"administracion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-todos-administracion-ajuste': {
            var queryObj = {"status":true,"area":"administracion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-todos-todos': {
            var queryObj = {"status":true,"admin":true};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-todos-diseno': {
            var queryObj = {"status":true,"admin":true,"permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-todos-simulacion': {
            var queryObj = {"status":true,"admin":true,"permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-todos-disenoSimulacion': {
            var queryObj = {"status":true,"admin":true,"permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-todos-projectManager': {
            var queryObj = {"status":true,"admin":true,"permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-todos-cadCam': {
            var queryObj = {"status":true,"admin":true,"permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-todos-mecanizado': {
            var queryObj = {"status":true,"admin":true,"permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-todos-ajuste': {
            var queryObj = {"status":true,"admin":true,"permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-ingenieria-todos': {
            var queryObj = {"status":true,"admin":true,"area":"ingenieria"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-ingenieria-diseno': {
            var queryObj = {"status":true,"admin":true,"area":"ingenieria","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-ingenieria-simulacion': {
            var queryObj = {"status":true,"admin":true,"area":"ingenieria","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-ingenieria-disenoSimulacion': {
            var queryObj = {"status":true,"admin":true,"area":"ingenieria","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-ingenieria-projectManager': {
            var queryObj = {"status":true,"admin":true,"area":"ingenieria","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-ingenieria-cadCam': {
            var queryObj = {"status":true,"admin":true,"area":"ingenieria","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-ingenieria-mecanizado': {
            var queryObj = {"status":true,"admin":true,"area":"ingenieria","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-ingenieria-ajuste': {
            var queryObj = {"status":true,"admin":true,"area":"ingenieria","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-fabricacion-todos': {
            var queryObj = {"status":true,"admin":true,"area":"fabricacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-fabricacion-diseno': {
            var queryObj = {"status":true,"admin":true,"area":"fabricacion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-fabricacion-simulacion': {
            var queryObj = {"status":true,"admin":true,"area":"fabricacion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-fabricacion-disenoSimulacion': {
            var queryObj = {"status":true,"admin":true,"area":"fabricacion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-fabricacion-projectManager': {
            var queryObj = {"status":true,"admin":true,"area":"fabricacion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-fabricacion-cadCam': {
            var queryObj = {"status":true,"admin":true,"area":"fabricacion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-fabricacion-mecanizado': {
            var queryObj = {"status":true,"admin":true,"area":"fabricacion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-fabricacion-ajuste': {
            var queryObj = {"status":true,"admin":true,"area":"fabricacion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-proyectos-todos': {
            var queryObj = {"status":true,"admin":true,"area":"proyectos"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-proyectos-diseno': {
            var queryObj = {"status":true,"admin":true,"area":"proyectos","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-proyectos-simulacion': {
            var queryObj = {"status":true,"admin":true,"area":"proyectos","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-proyectos-disenoSimulacion': {
            var queryObj = {"status":true,"admin":true,"area":"proyectos","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-proyectos-projectManager': {
            var queryObj = {"status":true,"admin":true,"area":"proyectos","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-proyectos-cadCam': {
            var queryObj = {"status":true,"admin":true,"area":"proyectos","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-proyectos-mecanizado': {
            var queryObj = {"status":true,"admin":true,"area":"proyectos","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-proyectos-ajuste': {
            var queryObj = {"status":true,"admin":true,"area":"proyectos","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-administracion-todos': {
            var queryObj = {"status":true,"admin":true,"area":"administracion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-administracion-diseno': {
            var queryObj = {"status":true,"admin":true,"area":"administracion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-administracion-simulacion': {
            var queryObj = {"status":true,"admin":true,"area":"administracion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-administracion-disenoSimulacion': {
            var queryObj = {"status":true,"admin":true,"area":"administracion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-administracion-projectManager': {
            var queryObj = {"status":true,"admin":true,"area":"administracion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-administracion-cadCam': {
            var queryObj = {"status":true,"admin":true,"area":"administracion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-administracion-mecanizado': {
            var queryObj = {"status":true,"admin":true,"area":"administracion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-true-administracion-ajuste': {
            var queryObj = {"status":true,"admin":true,"area":"administracion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-todos-todos': {
            var queryObj = {"status":true,"admin":false};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-todos-diseno': {
            var queryObj = {"status":true,"admin":false,"permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-todos-simulacion': {
            var queryObj = {"status":true,"admin":false,"permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-todos-disenoSimulacion': {
            var queryObj = {"status":true,"admin":false,"permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-todos-projectManager': {
            var queryObj = {"status":true,"admin":false,"permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-todos-cadCam': {
            var queryObj = {"status":true,"admin":false,"permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-todos-mecanizado': {
            var queryObj = {"status":true,"admin":false,"permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-todos-ajuste': {
            var queryObj = {"status":true,"admin":false,"permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-ingenieria-todos': {
            var queryObj = {"status":true,"admin":false,"area":"ingenieria"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-ingenieria-diseno': {
            var queryObj = {"status":true,"admin":false,"area":"ingenieria","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-ingenieria-simulacion': {
            var queryObj = {"status":true,"admin":false,"area":"ingenieria","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-ingenieria-disenoSimulacion': {
            var queryObj = {"status":true,"admin":false,"area":"ingenieria","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-ingenieria-projectManager': {
            var queryObj = {"status":true,"admin":false,"area":"ingenieria","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-ingenieria-cadCam': {
            var queryObj = {"status":true,"admin":false,"area":"ingenieria","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-ingenieria-mecanizado': {
            var queryObj = {"status":true,"admin":false,"area":"ingenieria","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-ingenieria-ajuste': {
            var queryObj = {"status":true,"admin":false,"area":"ingenieria","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-fabricacion-todos': {
            var queryObj = {"status":true,"admin":false,"area":"fabricacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-fabricacion-diseno': {
            var queryObj = {"status":true,"admin":false,"area":"fabricacion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-fabricacion-simulacion': {
            var queryObj = {"status":true,"admin":false,"area":"fabricacion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-fabricacion-disenoSimulacion': {
            var queryObj = {"status":true,"admin":false,"area":"fabricacion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-fabricacion-projectManager': {
            var queryObj = {"status":true,"admin":false,"area":"fabricacion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-fabricacion-cadCam': {
            var queryObj = {"status":true,"admin":false,"area":"fabricacion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-fabricacion-mecanizado': {
            var queryObj = {"status":true,"admin":false,"area":"fabricacion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-fabricacion-ajuste': {
            var queryObj = {"status":true,"admin":false,"area":"fabricacion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-proyectos-todos': {
            var queryObj = {"status":true,"admin":false,"area":"proyectos"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-proyectos-diseno': {
            var queryObj = {"status":true,"admin":false,"area":"proyectos","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-proyectos-simulacion': {
            var queryObj = {"status":true,"admin":false,"area":"proyectos","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-proyectos-disenoSimulacion': {
            var queryObj = {"status":true,"admin":false,"area":"proyectos","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-proyectos-projectManager': {
            var queryObj = {"status":true,"admin":false,"area":"proyectos","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-proyectos-cadCam': {
            var queryObj = {"status":true,"admin":false,"area":"proyectos","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-proyectos-mecanizado': {
            var queryObj = {"status":true,"admin":false,"area":"proyectos","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-proyectos-ajuste': {
            var queryObj = {"status":true,"admin":false,"area":"proyectos","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-administracion-todos': {
            var queryObj = {"status":true,"admin":false,"area":"administracion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-administracion-diseno': {
            var queryObj = {"status":true,"admin":false,"area":"administracion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-administracion-simulacion': {
            var queryObj = {"status":true,"admin":false,"area":"administracion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-administracion-disenoSimulacion': {
            var queryObj = {"status":true,"admin":false,"area":"administracion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-administracion-projectManager': {
            var queryObj = {"status":true,"admin":false,"area":"administracion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-administracion-cadCam': {
            var queryObj = {"status":true,"admin":false,"area":"administracion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-administracion-mecanizado': {
            var queryObj = {"status":true,"admin":false,"area":"administracion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--true-false-administracion-ajuste': {
            var queryObj = {"status":true,"admin":false,"area":"administracion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-todos-todos': {
            var queryObj = {"status":false};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-todos-diseno': {
            var queryObj = {"status":false,"permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-todos-simulacion': {
            var queryObj = {"status":false,"permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-todos-disenoSimulacion': {
            var queryObj = {"status":false,"permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-todos-projectManager': {
            var queryObj = {"status":false,"permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-todos-cadCam': {
            var queryObj = {"status":false,"permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-todos-mecanizado': {
            var queryObj = {"status":false,"permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-todos-ajuste': {
            var queryObj = {"status":false,"permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-ingenieria-todos': {
            var queryObj = {"status":false,"area":"ingenieria"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-ingenieria-diseno': {
            var queryObj = {"status":false,"area":"ingenieria","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-ingenieria-simulacion': {
            var queryObj = {"status":false,"area":"ingenieria","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-ingenieria-disenoSimulacion': {
            var queryObj = {"status":false,"area":"ingenieria","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-ingenieria-projectManager': {
            var queryObj = {"status":false,"area":"ingenieria","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-ingenieria-cadCam': {
            var queryObj = {"status":false,"area":"ingenieria","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-ingenieria-mecanizado': {
            var queryObj = {"status":false,"area":"ingenieria","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-ingenieria-ajuste': {
            var queryObj = {"status":false,"area":"ingenieria","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-fabricacion-todos': {
            var queryObj = {"status":false,"area":"fabricacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-fabricacion-diseno': {
            var queryObj = {"status":false,"area":"fabricacion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-fabricacion-simulacion': {
            var queryObj = {"status":false,"area":"fabricacion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-fabricacion-disenoSimulacion': {
            var queryObj = {"status":false,"area":"fabricacion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-fabricacion-projectManager': {
            var queryObj = {"status":false,"area":"fabricacion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-fabricacion-cadCam': {
            var queryObj = {"status":false,"area":"fabricacion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-fabricacion-mecanizado': {
            var queryObj = {"status":false,"area":"fabricacion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-fabricacion-ajuste': {
            var queryObj = {"status":false,"area":"fabricacion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-proyectos-todos': {
            var queryObj = {"status":false,"area":"proyectos"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-proyectos-diseno': {
            var queryObj = {"status":false,"area":"proyectos","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-proyectos-simulacion': {
            var queryObj = {"status":false,"area":"proyectos","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-proyectos-disenoSimulacion': {
            var queryObj = {"status":false,"area":"proyectos","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-proyectos-projectManager': {
            var queryObj = {"status":false,"area":"proyectos","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-proyectos-cadCam': {
            var queryObj = {"status":false,"area":"proyectos","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-proyectos-mecanizado': {
            var queryObj = {"status":false,"area":"proyectos","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-proyectos-ajuste': {
            var queryObj = {"status":false,"area":"proyectos","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-administracion-todos': {
            var queryObj = {"status":false,"area":"administracion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-administracion-diseno': {
            var queryObj = {"status":false,"area":"administracion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-administracion-simulacion': {
            var queryObj = {"status":false,"area":"administracion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-administracion-disenoSimulacion': {
            var queryObj = {"status":false,"area":"administracion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-administracion-projectManager': {
            var queryObj = {"status":false,"area":"administracion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-administracion-cadCam': {
            var queryObj = {"status":false,"area":"administracion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-administracion-mecanizado': {
            var queryObj = {"status":false,"area":"administracion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-todos-administracion-ajuste': {
            var queryObj = {"status":false,"area":"administracion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-todos-todos': {
            var queryObj = {"status":false,"admin":true};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-todos-diseno': {
            var queryObj = {"status":false,"admin":true,"permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-todos-simulacion': {
            var queryObj = {"status":false,"admin":true,"permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-todos-disenoSimulacion': {
            var queryObj = {"status":false,"admin":true,"permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-todos-projectManager': {
            var queryObj = {"status":false,"admin":true,"permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-todos-cadCam': {
            var queryObj = {"status":false,"admin":true,"permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-todos-mecanizado': {
            var queryObj = {"status":false,"admin":true,"permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-todos-ajuste': {
            var queryObj = {"status":false,"admin":true,"permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-ingenieria-todos': {
            var queryObj = {"status":false,"admin":true,"area":"ingenieria"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-ingenieria-diseno': {
            var queryObj = {"status":false,"admin":true,"area":"ingenieria","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-ingenieria-simulacion': {
            var queryObj = {"status":false,"admin":true,"area":"ingenieria","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-ingenieria-disenoSimulacion': {
            var queryObj = {"status":false,"admin":true,"area":"ingenieria","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-ingenieria-projectManager': {
            var queryObj = {"status":false,"admin":true,"area":"ingenieria","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-ingenieria-cadCam': {
            var queryObj = {"status":false,"admin":true,"area":"ingenieria","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-ingenieria-mecanizado': {
            var queryObj = {"status":false,"admin":true,"area":"ingenieria","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-ingenieria-ajuste': {
            var queryObj = {"status":false,"admin":true,"area":"ingenieria","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-fabricacion-todos': {
            var queryObj = {"status":false,"admin":true,"area":"fabricacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-fabricacion-diseno': {
            var queryObj = {"status":false,"admin":true,"area":"fabricacion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-fabricacion-simulacion': {
            var queryObj = {"status":false,"admin":true,"area":"fabricacion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-fabricacion-disenoSimulacion': {
            var queryObj = {"status":false,"admin":true,"area":"fabricacion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-fabricacion-projectManager': {
            var queryObj = {"status":false,"admin":true,"area":"fabricacion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-fabricacion-cadCam': {
            var queryObj = {"status":false,"admin":true,"area":"fabricacion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-fabricacion-mecanizado': {
            var queryObj = {"status":false,"admin":true,"area":"fabricacion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-fabricacion-ajuste': {
            var queryObj = {"status":false,"admin":true,"area":"fabricacion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-proyectos-todos': {
            var queryObj = {"status":false,"admin":true,"area":"proyectos"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-proyectos-diseno': {
            var queryObj = {"status":false,"admin":true,"area":"proyectos","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-proyectos-simulacion': {
            var queryObj = {"status":false,"admin":true,"area":"proyectos","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-proyectos-disenoSimulacion': {
            var queryObj = {"status":false,"admin":true,"area":"proyectos","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-proyectos-projectManager': {
            var queryObj = {"status":false,"admin":true,"area":"proyectos","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-proyectos-cadCam': {
            var queryObj = {"status":false,"admin":true,"area":"proyectos","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-proyectos-mecanizado': {
            var queryObj = {"status":false,"admin":true,"area":"proyectos","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-proyectos-ajuste': {
            var queryObj = {"status":false,"admin":true,"area":"proyectos","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-administracion-todos': {
            var queryObj = {"status":false,"admin":true,"area":"administracion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-administracion-diseno': {
            var queryObj = {"status":false,"admin":true,"area":"administracion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-administracion-simulacion': {
            var queryObj = {"status":false,"admin":true,"area":"administracion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-administracion-disenoSimulacion': {
            var queryObj = {"status":false,"admin":true,"area":"administracion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-administracion-projectManager': {
            var queryObj = {"status":false,"admin":true,"area":"administracion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-administracion-cadCam': {
            var queryObj = {"status":false,"admin":true,"area":"administracion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-administracion-mecanizado': {
            var queryObj = {"status":false,"admin":true,"area":"administracion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-true-administracion-ajuste': {
            var queryObj = {"status":false,"admin":true,"area":"administracion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-todos-todos': {
            var queryObj = {"status":false,"admin":false};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-todos-diseno': {
            var queryObj = {"status":false,"admin":false,"permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-todos-simulacion': {
            var queryObj = {"status":false,"admin":false,"permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-todos-disenoSimulacion': {
            var queryObj = {"status":false,"admin":false,"permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-todos-projectManager': {
            var queryObj = {"status":false,"admin":false,"permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-todos-cadCam': {
            var queryObj = {"status":false,"admin":false,"permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-todos-mecanizado': {
            var queryObj = {"status":false,"admin":false,"permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-todos-ajuste': {
            var queryObj = {"status":false,"admin":false,"permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-ingenieria-todos': {
            var queryObj = {"status":false,"admin":false,"area":"ingenieria"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-ingenieria-diseno': {
            var queryObj = {"status":false,"admin":false,"area":"ingenieria","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-ingenieria-simulacion': {
            var queryObj = {"status":false,"admin":false,"area":"ingenieria","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-ingenieria-disenoSimulacion': {
            var queryObj = {"status":false,"admin":false,"area":"ingenieria","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-ingenieria-projectManager': {
            var queryObj = {"status":false,"admin":false,"area":"ingenieria","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-ingenieria-cadCam': {
            var queryObj = {"status":false,"admin":false,"area":"ingenieria","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-ingenieria-mecanizado': {
            var queryObj = {"status":false,"admin":false,"area":"ingenieria","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-ingenieria-ajuste': {
            var queryObj = {"status":false,"admin":false,"area":"ingenieria","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-fabricacion-todos': {
            var queryObj = {"status":false,"admin":false,"area":"fabricacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-fabricacion-diseno': {
            var queryObj = {"status":false,"admin":false,"area":"fabricacion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-fabricacion-simulacion': {
            var queryObj = {"status":false,"admin":false,"area":"fabricacion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-fabricacion-disenoSimulacion': {
            var queryObj = {"status":false,"admin":false,"area":"fabricacion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-fabricacion-projectManager': {
            var queryObj = {"status":false,"admin":false,"area":"fabricacion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-fabricacion-cadCam': {
            var queryObj = {"status":false,"admin":false,"area":"fabricacion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-fabricacion-mecanizado': {
            var queryObj = {"status":false,"admin":false,"area":"fabricacion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-fabricacion-ajuste': {
            var queryObj = {"status":false,"admin":false,"area":"fabricacion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-proyectos-todos': {
            var queryObj = {"status":false,"admin":false,"area":"proyectos"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-proyectos-diseno': {
            var queryObj = {"status":false,"admin":false,"area":"proyectos","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-proyectos-simulacion': {
            var queryObj = {"status":false,"admin":false,"area":"proyectos","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-proyectos-disenoSimulacion': {
            var queryObj = {"status":false,"admin":false,"area":"proyectos","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-proyectos-projectManager': {
            var queryObj = {"status":false,"admin":false,"area":"proyectos","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-proyectos-cadCam': {
            var queryObj = {"status":false,"admin":false,"area":"proyectos","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-proyectos-mecanizado': {
            var queryObj = {"status":false,"admin":false,"area":"proyectos","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-proyectos-ajuste': {
            var queryObj = {"status":false,"admin":false,"area":"proyectos","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-administracion-todos': {
            var queryObj = {"status":false,"admin":false,"area":"administracion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-administracion-diseno': {
            var queryObj = {"status":false,"admin":false,"area":"administracion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-administracion-simulacion': {
            var queryObj = {"status":false,"admin":false,"area":"administracion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-administracion-disenoSimulacion': {
            var queryObj = {"status":false,"admin":false,"area":"administracion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-administracion-projectManager': {
            var queryObj = {"status":false,"admin":false,"area":"administracion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-administracion-cadCam': {
            var queryObj = {"status":false,"admin":false,"area":"administracion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-administracion-mecanizado': {
            var queryObj = {"status":false,"admin":false,"area":"administracion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor--false-false-administracion-ajuste': {
            var queryObj = {"status":false,"admin":false,"area":"administracion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-todos-todos': {
            var queryObj = {$or: nameAndOthersQueries};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-todos-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-todos-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-todos-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-todos-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-todos-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-todos-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-todos-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-ingenieria-todos': {
            var queryObj = {$or: nameAndOthersQueries,"area":"ingenieria"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-ingenieria-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"area":"ingenieria","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-ingenieria-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"area":"ingenieria","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-ingenieria-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"area":"ingenieria","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-ingenieria-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"area":"ingenieria","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-ingenieria-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"area":"ingenieria","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-ingenieria-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"area":"ingenieria","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-ingenieria-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"area":"ingenieria","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-fabricacion-todos': {
            var queryObj = {$or: nameAndOthersQueries,"area":"fabricacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-fabricacion-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"area":"fabricacion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-fabricacion-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"area":"fabricacion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-fabricacion-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"area":"fabricacion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-fabricacion-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"area":"fabricacion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-fabricacion-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"area":"fabricacion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-fabricacion-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"area":"fabricacion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-fabricacion-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"area":"fabricacion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-proyectos-todos': {
            var queryObj = {$or: nameAndOthersQueries,"area":"proyectos"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-proyectos-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"area":"proyectos","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-proyectos-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"area":"proyectos","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-proyectos-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"area":"proyectos","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-proyectos-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"area":"proyectos","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-proyectos-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"area":"proyectos","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-proyectos-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"area":"proyectos","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-proyectos-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"area":"proyectos","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-administracion-todos': {
            var queryObj = {$or: nameAndOthersQueries,"area":"administracion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-administracion-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"area":"administracion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-administracion-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"area":"administracion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-administracion-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"area":"administracion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-administracion-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"area":"administracion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-administracion-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"area":"administracion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-administracion-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"area":"administracion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-todos-administracion-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"area":"administracion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-todos-todos': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-todos-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-todos-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-todos-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-todos-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-todos-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-todos-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-todos-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-ingenieria-todos': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"ingenieria"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-ingenieria-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"ingenieria","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-ingenieria-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"ingenieria","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-ingenieria-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"ingenieria","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-ingenieria-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"ingenieria","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-ingenieria-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"ingenieria","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-ingenieria-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"ingenieria","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-ingenieria-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"ingenieria","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-fabricacion-todos': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"fabricacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-fabricacion-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"fabricacion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-fabricacion-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"fabricacion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-fabricacion-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"fabricacion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-fabricacion-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"fabricacion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-fabricacion-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"fabricacion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-fabricacion-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"fabricacion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-fabricacion-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"fabricacion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-proyectos-todos': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"proyectos"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-proyectos-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"proyectos","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-proyectos-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"proyectos","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-proyectos-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"proyectos","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-proyectos-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"proyectos","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-proyectos-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"proyectos","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-proyectos-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"proyectos","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-proyectos-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"proyectos","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-administracion-todos': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"administracion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-administracion-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"administracion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-administracion-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"administracion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-administracion-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"administracion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-administracion-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"administracion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-administracion-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"administracion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-administracion-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"administracion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-true-administracion-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"admin":true,"area":"administracion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-todos-todos': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-todos-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-todos-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-todos-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-todos-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-todos-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-todos-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-todos-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-ingenieria-todos': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"ingenieria"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-ingenieria-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"ingenieria","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-ingenieria-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"ingenieria","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-ingenieria-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"ingenieria","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-ingenieria-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"ingenieria","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-ingenieria-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"ingenieria","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-ingenieria-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"ingenieria","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-ingenieria-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"ingenieria","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-fabricacion-todos': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"fabricacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-fabricacion-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"fabricacion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-fabricacion-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"fabricacion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-fabricacion-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"fabricacion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-fabricacion-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"fabricacion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-fabricacion-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"fabricacion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-fabricacion-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"fabricacion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-fabricacion-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"fabricacion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-proyectos-todos': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"proyectos"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-proyectos-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"proyectos","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-proyectos-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"proyectos","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-proyectos-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"proyectos","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-proyectos-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"proyectos","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-proyectos-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"proyectos","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-proyectos-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"proyectos","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-proyectos-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"proyectos","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-administracion-todos': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"administracion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-administracion-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"administracion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-administracion-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"administracion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-administracion-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"administracion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-administracion-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"administracion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-administracion-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"administracion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-administracion-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"administracion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-todos-false-administracion-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"admin":false,"area":"administracion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-todos-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":true};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-todos-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-todos-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-todos-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-todos-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-todos-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-todos-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-todos-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-ingenieria-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"ingenieria"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-ingenieria-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"ingenieria","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-ingenieria-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"ingenieria","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-ingenieria-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"ingenieria","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-ingenieria-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"ingenieria","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-ingenieria-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"ingenieria","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-ingenieria-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"ingenieria","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-ingenieria-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"ingenieria","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-fabricacion-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"fabricacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-fabricacion-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"fabricacion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-fabricacion-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"fabricacion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-fabricacion-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"fabricacion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-fabricacion-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"fabricacion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-fabricacion-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"fabricacion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-fabricacion-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"fabricacion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-fabricacion-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"fabricacion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-proyectos-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"proyectos"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-proyectos-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"proyectos","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-proyectos-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"proyectos","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-proyectos-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"proyectos","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-proyectos-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"proyectos","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-proyectos-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"proyectos","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-proyectos-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"proyectos","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-proyectos-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"proyectos","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-administracion-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"administracion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-administracion-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"administracion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-administracion-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"administracion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-administracion-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"administracion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-administracion-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"administracion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-administracion-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"administracion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-administracion-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"administracion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-todos-administracion-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"area":"administracion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-todos-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-todos-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-todos-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-todos-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-todos-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-todos-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-todos-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-todos-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-ingenieria-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"ingenieria"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-ingenieria-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"ingenieria","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-ingenieria-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"ingenieria","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-ingenieria-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"ingenieria","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-ingenieria-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"ingenieria","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-ingenieria-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"ingenieria","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-ingenieria-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"ingenieria","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-ingenieria-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"ingenieria","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-fabricacion-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"fabricacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-fabricacion-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"fabricacion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-fabricacion-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"fabricacion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-fabricacion-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"fabricacion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-fabricacion-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"fabricacion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-fabricacion-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"fabricacion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-fabricacion-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"fabricacion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-fabricacion-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"fabricacion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-proyectos-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"proyectos"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-proyectos-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"proyectos","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-proyectos-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"proyectos","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-proyectos-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"proyectos","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-proyectos-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"proyectos","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-proyectos-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"proyectos","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-proyectos-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"proyectos","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-proyectos-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"proyectos","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-administracion-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"administracion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-administracion-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"administracion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-administracion-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"administracion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-administracion-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"administracion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-administracion-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"administracion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-administracion-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"administracion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-administracion-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"administracion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-true-administracion-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":true,"area":"administracion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-todos-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-todos-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-todos-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-todos-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-todos-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-todos-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-todos-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-todos-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-ingenieria-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"ingenieria"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-ingenieria-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"ingenieria","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-ingenieria-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"ingenieria","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-ingenieria-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"ingenieria","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-ingenieria-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"ingenieria","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-ingenieria-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"ingenieria","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-ingenieria-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"ingenieria","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-ingenieria-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"ingenieria","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-fabricacion-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"fabricacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-fabricacion-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"fabricacion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-fabricacion-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"fabricacion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-fabricacion-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"fabricacion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-fabricacion-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"fabricacion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-fabricacion-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"fabricacion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-fabricacion-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"fabricacion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-fabricacion-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"fabricacion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-proyectos-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"proyectos"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-proyectos-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"proyectos","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-proyectos-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"proyectos","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-proyectos-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"proyectos","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-proyectos-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"proyectos","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-proyectos-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"proyectos","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-proyectos-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"proyectos","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-proyectos-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"proyectos","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-administracion-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"administracion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-administracion-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"administracion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-administracion-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"administracion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-administracion-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"administracion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-administracion-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"administracion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-administracion-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"administracion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-administracion-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"administracion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-true-false-administracion-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":true,"admin":false,"area":"administracion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-todos-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":false};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-todos-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-todos-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-todos-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-todos-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-todos-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-todos-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-todos-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-ingenieria-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"ingenieria"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-ingenieria-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"ingenieria","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-ingenieria-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"ingenieria","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-ingenieria-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"ingenieria","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-ingenieria-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"ingenieria","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-ingenieria-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"ingenieria","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-ingenieria-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"ingenieria","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-ingenieria-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"ingenieria","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-fabricacion-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"fabricacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-fabricacion-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"fabricacion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-fabricacion-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"fabricacion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-fabricacion-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"fabricacion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-fabricacion-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"fabricacion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-fabricacion-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"fabricacion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-fabricacion-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"fabricacion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-fabricacion-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"fabricacion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-proyectos-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"proyectos"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-proyectos-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"proyectos","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-proyectos-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"proyectos","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-proyectos-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"proyectos","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-proyectos-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"proyectos","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-proyectos-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"proyectos","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-proyectos-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"proyectos","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-proyectos-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"proyectos","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-administracion-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"administracion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-administracion-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"administracion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-administracion-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"administracion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-administracion-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"administracion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-administracion-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"administracion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-administracion-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"administracion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-administracion-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"administracion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-todos-administracion-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"area":"administracion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-todos-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-todos-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-todos-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-todos-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-todos-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-todos-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-todos-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-todos-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-ingenieria-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"ingenieria"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-ingenieria-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"ingenieria","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-ingenieria-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"ingenieria","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-ingenieria-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"ingenieria","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-ingenieria-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"ingenieria","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-ingenieria-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"ingenieria","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-ingenieria-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"ingenieria","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-ingenieria-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"ingenieria","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-fabricacion-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"fabricacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-fabricacion-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"fabricacion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-fabricacion-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"fabricacion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-fabricacion-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"fabricacion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-fabricacion-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"fabricacion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-fabricacion-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"fabricacion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-fabricacion-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"fabricacion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-fabricacion-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"fabricacion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-proyectos-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"proyectos"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-proyectos-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"proyectos","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-proyectos-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"proyectos","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-proyectos-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"proyectos","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-proyectos-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"proyectos","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-proyectos-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"proyectos","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-proyectos-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"proyectos","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-proyectos-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"proyectos","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-administracion-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"administracion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-administracion-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"administracion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-administracion-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"administracion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-administracion-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"administracion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-administracion-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"administracion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-administracion-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"administracion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-administracion-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"administracion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-true-administracion-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":true,"area":"administracion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-todos-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-todos-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-todos-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-todos-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-todos-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-todos-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-todos-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-todos-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-ingenieria-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"ingenieria"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-ingenieria-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"ingenieria","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-ingenieria-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"ingenieria","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-ingenieria-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"ingenieria","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-ingenieria-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"ingenieria","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-ingenieria-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"ingenieria","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-ingenieria-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"ingenieria","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-ingenieria-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"ingenieria","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-fabricacion-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"fabricacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-fabricacion-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"fabricacion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-fabricacion-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"fabricacion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-fabricacion-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"fabricacion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-fabricacion-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"fabricacion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-fabricacion-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"fabricacion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-fabricacion-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"fabricacion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-fabricacion-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"fabricacion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-proyectos-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"proyectos"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-proyectos-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"proyectos","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-proyectos-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"proyectos","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-proyectos-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"proyectos","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-proyectos-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"proyectos","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-proyectos-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"proyectos","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-proyectos-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"proyectos","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-proyectos-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"proyectos","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-administracion-todos': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"administracion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-administracion-diseno': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"administracion","permiso":"diseno"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-administracion-simulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"administracion","permiso":"simulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-administracion-disenoSimulacion': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"administracion","permiso":"disenoSimulacion"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-administracion-projectManager': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"administracion","permiso":"projectManager"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-administracion-cadCam': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"administracion","permiso":"cadCam"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-administracion-mecanizado': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"administracion","permiso":"mecanizado"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyString-false-false-administracion-ajuste': {
            var queryObj = {$or: nameAndOthersQueries,"status":false,"admin":false,"area":"administracion","permiso":"ajuste"};
            var resultados = await Usuarios.find(queryObj);
            break;
        }
        case 'filterFor-noEmptyNumber-todos-todos-todos-todos': {
            var queryObj = nameAndOthersQueries;
            var resultados = await Usuarios.aggregate(queryObj);
            break;
        }
        default: {
            var resultados = ['vacio'];
            break;
        }
    }
    return resultados
}

module.exports = {
    switchFilterUsers
}