<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Jekyll v4.1.1">
    
    <title>BOT WhastApp</title>

    <!-- <link rel="canonical" href="https://getbootstrap.com/docs/4.5/examples/checkout/"> -->

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <!-- <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet"> -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>

    <style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
    </style>

    <!-- Custom styles for this template 
    <link href="form-validation.css" rel="stylesheet">
    -->
  
    <script>
    function retSrvTxt(txt, qualdiv) {
      if (qualdiv == '1') {
        //document.getElementById("divenv").innerHTML = txt;
        var x = document.getElementById('textoEnvio'); 
            x.value = txt; 
      }
      if (qualdiv == '2') {
        //document.getElementById("divret").innerHTML = txt;
        var x = document.getElementById('textoJson'); 
            x.value = txt; 
      }
      // $document.getElementById("divret").innerText = "New text Content";
    }
  </script>


  </head>
  <?php
    function base64ToImage($base64_string, $output_file,$remover) {
      $file = fopen($output_file, "wb");
      $data = explode(",", $base64_string);
      if($remover==1)
      {
        fwrite($file, base64_decode($data[1]));
      }else{
        fwrite($file, base64_decode($base64_string));
      }
      fclose($file);
      return $output_file;
    }


  ?>

 
  <body class="bg-light">
    <div class="container">
  <div class="py-3 text-center">
    <!-- <img class="d-block mx-auto mb-4" src="logo.png" alt="" width="72" height="72"> -->
    <h3>Envio de Mensagens - WhatsApp BOT</h3>
  </div>

  <div class="row">
    <!-- <div class="col-md-8 order-md-1"> -->
    <div class="col-md-12 order-md-1">
      <!-- <h4 class="mb-3">ORIGEM</h4> -->
      <hr class="mb-4">
      <!-- <form class="needs-validation" action="index.php" method="post" novalidate > -->
      <form class="needs-validation" action="" enctype="multipart/form-data" method="post"  novalidate>

        <div class="row">

          <div class="col-md-6 mb-3">
            <label for="fone">Fone WhatsApp</label>
            <input type="text" class="form-control form-control-sm" id="fone" name="fone" placeholder="551191049200" value="" required>
            <div class="invalid-feedback">
              Telefone é obrigatorio.
            </div>
          </div>

          <div class="col-md-6 mb-3">
            <label for="textomsg">Texto da Mensagem</label>
            <input type="text" class="form-control form-control-sm" id="textomsg" name="textomsg" placeholder="Mensagem para Enviar..." value="" required>
            <div class="invalid-feedback">
              Mensagem.
            </div>
          </div>

        </div>

        <div class="mb-3">
          <label for="email">Email <span class="text-muted">(Optional)</span></label>
          <input type="email" class="form-control form-control-sm" id="email" name="email" placeholder="you@example.com">
          <div class="invalid-feedback">
            Email.
          </div>
        </div>
        
        <div class="mb-3">
          <label for='upload'>Anexos:</label>
          <input class="form-control-file form-control-sm" id='upload' name="upload[]" type="file" multiple="multiple" />
        </div>

        <hr class="mb-4">
          <div class="mb-4" id="divenv" name="divenv">
           <label for='textoEnvio'>Enviado:</label>
            <textarea readonly class='form-control form-control-sm' id='textoEnvio' rows='3' name='textoEnvio'></textarea>
          </div>

          <div class="mb-4" id="divret" name="divret">
            <label for='textoJson'>Retorno:</label>
            <textarea readonly class='form-control form-control-sm' id='textoJson' rows='3' name='textoJson'></textarea>
          </div>

          <div class="mb-4">
            <button class="btn btn-primary btn-lg btn-block" type="submit">Enviar</button>
          </div>
      </form>
    </div>
  </div>

  <!-- <footer class="my-2 pt-2 text-muted text-center text-small">
    <p class="mb-1">&copy; 2021 Moshe Informatica</p>
    <ul class="list-inline">
      <li class="list-inline-item"><a href="#">By</a></li>
      <li class="list-inline-item"><a href="#">Greeks</a></li>
      <li class="list-inline-item"><a href="#">Developers</a></li>
    </ul>
  </footer> -->

</div>

<!-- =========================================================================== JS SCRIPTs -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<!-- <script>window.jQuery || document.write('<script src="../assets/js/vendor/jquery.slim.min.js"><\/script>')</script> -->
<!--  <script src="../assets/dist/js/bootstrap.bundle.min.js"></script> -->
<!-- <script src="form-validation.js"></script> -->
<!-- ================================================================================== Enviando para o NODE !  -->
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST")
//if(isset($_POST['submit']))
{
  // collect value of input field
  $fone  = $_POST['fone'];
  $texto = $_POST['textomsg'];
  $email = $_POST['email'];
  
  $envdata["token"]     = "mm147";
  $envdata["fone"]      = $fone;
  $envdata["textomsg"]  = $texto;
  $envdata["email"]     = $email;

  //============================================================ arquivos
  
  if(count($_FILES['upload']['name']) > 0){
    echo "<hr>";
    $imagens = array();
    $qntfiles = count($_FILES['upload']['name'])-1;
    //echo $qntfiles;

    for($i=0; $i<count($_FILES['upload']['name']); $i++) {
      
      //Get the temp file path ( Origem )
      $tmpFilePath = $_FILES['upload']['tmp_name'][$i];
      
      //Tem  filepath ?
      if($tmpFilePath != ""){
        //Nome do Arquivo
        $shortname = $_FILES['upload']['name'][$i];
        $ext = strtoupper(pathinfo($shortname, PATHINFO_EXTENSION));
        $fileType = $_FILES['upload']['type'];
        $fileTypeArray = ["application/pdf", "application/doc", "application/docx", "application/rtf", "application/txt", "application/odf", "application/msword"];
        $extIMGArray = ["JPG","PNG","BMP","GIF","SVG","JPEG","ICO","TIFF","EPS","AVIF"];
        //Novo Nome....
        $filePath = "arqenviados/" . date('Y-m-d-H-i-s').'-'.$shortname;
        $filePath2 = "arqbase64/" . date('Y-m-d-H-i-s').'-'.$shortname;
        
        if (in_array( $ext,$extIMGArray))
        {
          $check = getimagesize($tmpFilePath);
        }else{
          $check = filesize($tmpFilePath);
        }

        if($check !== false) {
          $data = base64_encode(file_get_contents( $tmpFilePath ));
          //echo "<textarea id='data' style=''>data:".$check["mime"].";base64,".$data."</textarea>";
          $arquivo["0"] = $shortname;
          $arquivo["1"] = $data;
          array_push($imagens,$arquivo);

          // =====   decode =======  ( TESTE )
          //$arencode = json_encode($data);
          //$content = base64_decode($data);
          //$ar = (array)json_decode($arencode);
          //Monta a Imagem novamente com a string
          if (in_array( $ext,$extIMGArray)){
            base64ToImage($data,$filePath2,0);
          }else{
            $decoded = base64_decode($data);
            file_put_contents($filePath2, $decoded);
            // Enviar o arquivo via web
            // if (file_exists($file)) {
            //     header('Content-Description: File Transfer');
            //     header('Content-Type: application/octet-stream');
            //     header('Content-Disposition: attachment; filename="'.basename($file).'"');
            //     header('Expires: 0');
            //     header('Cache-Control: must-revalidate');
            //     header('Pragma: public');
            //     header('Content-Length: ' . filesize($file));
            //     readfile($file);
            //     exit;
            // }
          }

        } else {
          echo "ERRO - Tipo de Arquivo não permitido...." . $tmpFilePath;
        }
        //Upload the file into the temp dir
        if(move_uploaded_file($tmpFilePath, $filePath)) {
          $files[] = $shortname;
          //insert into db 
          //use $shortname for the filename
          //use $filePath for the relative url to the file
        }


      }
    }
    // Adiciona as imagens no json...  ( Result = é o jason final para enviar )
    $envdata["imagens"] = $imagens;
    $result["envdata"][]=$envdata;
    $jsonenc = json_encode($result);
    //var_dump($jsonenc)
 
    if($qntfiles>0){
      $txtfiles = "Arquivos enviados |";    
      foreach($files as $file)
      {
        $txtfiles = $txtfiles . " ".$file."  |  ";
      }
      echo "<script> retSrvTxt('".$txtfiles."', '1');</script>";
    }else{  
      echo "<script> retSrvTxt('Sem Anexos', '1'); </script>";  
    }

  }else{
    echo "<script> retSrvTxt('Sem Anexos...', '1'); </script>";
  }

  $len = strlen($jsonenc);
  //$len = sizeof($result,1);
  //$data_string = json_decode($result); 
  $data_string = $jsonenc;

  $ch = curl_init('http://localhost:8080/inbox');                                                                      
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
  curl_setopt($ch, CURLOPT_POSTFIELDS,    $data_string);                                                                  
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
  curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
                                            'Content-Type: application/json',                                                                                
                                            'Content-Length: ' . $len
                                            )                                                                       
  );                                                                                                                   
 
  curl_exec($ch);
  curl_close($ch);
  echo "<script> retSrvTxt('".$jsonenc."', '2'); </script>";



}

?>

<!-- ================================================================================== FIM -->
</body>
</html>
