<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Highscore</title>
    </head>
    <body>

        <?php foreach ($scores as $difficulty => $scorelist): ?>
            <h1><?php echo $difficulty; ?></h1>
            <ol>
                <?php foreach ($scorelist as $rank => $score): ?>
                    <li><?php echo $score["username"] . " " . $score["highscore"]; ?></li>
                <?php endforeach; ?>
            </ol>
        <?php endforeach; ?>
    
	</body>
</html>
