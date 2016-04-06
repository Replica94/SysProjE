<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Highscore</title>
        <link href='https://fonts.googleapis.com/css?family=Inconsolata' rel='stylesheet' type='text/css'>
    </head>
    <body style= "font-family: Inconsolata">

        <?php foreach ($scores as $difficulty => $scorelist): ?>
            <h1><?php echo $difficulty; ?></h1>
            <table>
                <?php foreach ($scorelist as $rank => $score): ?>
                    <tr>
                        <td><?php echo '#' . ($rank + 1); ?></td>
                        <td><?php echo $score["username"]; ?></td>
                        <td><?php echo $score["highscore"]; ?></td>
                    </tr>
                <?php endforeach; ?>
            </table>
        <?php endforeach; ?>
    
	</body>
</html>
