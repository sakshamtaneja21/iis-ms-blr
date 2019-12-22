<?php
include('config.php');
//print_r($_POST);
if(isset($_POST['submit']))
{
$fname=$_POST['driver_name'];
$num=$_POST['num'];
$query=mysqli_query($con,"insert into ambulance(num,driver_name) values('$num','$fname')");

}
?>


<!DOCTYPE html>
<html lang="en">

<head>
<title> Ambulance Registeration</title>
</head>
<body class="login">
<div class="logo margin-top-30">
<a href="../index.html"><h2>Ambulance Registration</h2></a>
</div>
<!-- start: REGISTER BOX -->
<div class="box-register">
<form name="registration" id="registration"  method="post" onSubmit="return valid();">
<fieldset>
<p>
Enter ambulance details below:
</p>
<div class="form-group">
<input type="text" class="form-control" name="num" placeholder="number" required>
</div>
<div class="form-group">
<input type="text" class="form-control" name="driver_name" placeholder="driver Name" required>
</div>


<form action="add_ambulance.php">
<button type="submit" class="btn btn-primary pull-right" id="submit" name="submit">
Submit <i class="fa fa-arrow-circle-right"></i>
</form>
</button>
</div>
</fieldset>
</form>



</div>

</div>
</div>



</body>
<!-- end: BODY -->
</html>

