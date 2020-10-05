$(function() { 
    
 
    function exibir_cachorros() {
        $.ajax({
            url: 'http://localhost:5000/listar_cachorros',
            method: 'GET',
            dataType: 'json', 
            success: listar, 
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });
        function listar (cachorros) {
            
            $('#corpoTabelaCachorros').empty();
         
            mostrar_conteudo("tabelaCachorros");      
          
            for (var i in cachorros) { 
                lin = '<tr>' + 
                '<td>' + cachorros[i].nome + '</td>' + 
                '<td>' + cachorros[i].genero + '</td>' + 
                '<td>' + cachorros[i].idade + '</td>' + 
                '<td>' + cachorros[i].raca + '</td>' + 
                '<td>' + cachorros[i].porte + '</td>' + 
                '<td>' + cachorros[i].cor + '</td>' + 
                '</tr>';
             
                $('#corpoTabelaCachorros').append(lin);
            }
        }
    }

    
    function mostrar_conteudo(identificador) {
      
        $("#tabelaCachorros").addClass('invisible');
        $("#conteudoInicial").addClass('invisible');
        $("#"+identificador).removeClass('invisible');      
    }

   
    $(document).on("click", "#linkListarCachorros", function() {
        exibir_cachorros();
    });
    
    
    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoInicial");
    });

  
    $(document).on("click", "#btIncluirCachorro", function() {
      
        nome = $("#campoNome").val();
        genero = $("#campoGenero").val();
        idade = $("#campoIdade").val();
        raca = $("#campoRaca").val();
        porte = $("#campoPorte").val();
        cor = $("#campoCor").val();
      
        var dados = JSON.stringify({ nome: nome, genero: genero, idade: idade, raca: raca, porte: porte, cor: cor });
     
        $.ajax({
            url: 'http://localhost:5000/incluir_cachorro',
            type: 'POST',
            dataType: 'json', 
            contentType: 'application/json', 
            data: dados, 
            success: cachorroIncluido, 
            error: erroAoIncluir
        });
        function cachorroIncluido (retorno) {
            if (retorno.resultado == "ok") { 
                
                alert("Cachorro incluído com sucesso!");
              
                $("#campoNome").val("");
                $("#campoGenero").val("");
                $("#campoIdade").val("");
                $("#campoRaca").val("");
                $("#campoPorte").val("");
                $("#campoCor").val("");
            } else {
               
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
           
            alert("ERRO: "+ retorno.resultado + ":" + retorno.detalhes);
        }
    });


    $('#modalIncluirCachorro').on('hide.bs.modal', function (e) {
        
        if (! $("#tabelaCachorros").hasClass('invisible')) {
    
            exibir_cachorros();
        }
    });

    
    mostrar_conteudo("conteudoInicial");
});