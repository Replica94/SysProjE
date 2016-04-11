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
        <script type="text/javascript">
            window.doorbellOptions = {
                appKey: 'Lk9qZQ2nhfU228PzX36FIRAblIEJfVhwWRkjYsb9s7g0KpzLAn7ozTrdOt3iea6X'
            };
            (function(d, t) {
                var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/3234?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g);
            }(document, 'script'));
        </script>
	</body>
</html>
