<?php
header('Content-type:application/json');
$postdata = json_decode(file_get_contents('php://input') , true);
$request = $postdata['request'];
require ('db.php');

		if ($request == 'sendMessage') {
		$from = $postdata['from'];
		$message = $postdata['message'];
		$date = $postdata['date'];
		$sql = "INSERT INTO messages (`msg` , `date`, `from`) VALUES ( '" . $message ."' , '" . $date. "' , '" . $from. "')";
		if ($conn->query($sql) === TRUE) {
			echo json_encode(true);
} else {
			echo json_encode(false);
}
			// execute SQL query and return result in JSON format

		}


		if ($request == 'getMessages') {

				$sql = "SELECT * FROM messages";
$result = $conn->query($sql);
$response = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
            $arr = array(
        	'id' => $row["id"],
        	'from' => $row["from"],
        	'msg' => $row["msg"],
        	'date' => $row["date"]
        	);
    array_push($response,$arr);

    }

    echo json_encode($response);
}  else {
    echo json_encode(false);
}

}


		if ($request == 'login') {
				$user = $postdata['user'];
				$sql = "SELECT * FROM users WHERE username='". $user . "'";
				$result = $conn->query($sql);
				if ($result->num_rows > 0) {
				echo json_encode(true);
				}
				else{
				echo json_encode(false);

				}

		}

				


$conn->close();
?>