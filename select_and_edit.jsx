var sel = app.activeDocument.selection;
if (sel.length == 0) {
    alert("No objects selected.");
} else {
    // Create an array of objects with their positions
    var selectedObjects = [];
    for (var i = 0; i < sel.length; i++) {
        var obj = sel[i];
        var position = obj.position;
        selectedObjects.push({
            object: obj,
            x: position[0],
            y: position[1]
        });
    }

    // Sort the objects by y (descending), then x (ascending)
    selectedObjects.sort(function(a, b) {
        if (a.y > b.y) return -1;
        if (a.y < b.y) return 1;
        if (a.x < b.x) return -1;
        if (a.x > b.x) return 1;
        return 0;
    });

    // Show the dialog
    showDialogForObjects(selectedObjects);
}

function showDialogForObjects(objects) {
    var dialog = new Window('dialog', 'Object Options');
    dialog.orientation = 'column';
    dialog.alignChildren = ['fill', 'top'];
    dialog.preferredSize.width = 400;
    dialog.spacing = 5;
    dialog.margins = 10;

    // Global options
    var globalOptionsGroup = dialog.add('panel', undefined, 'Global Options');
    globalOptionsGroup.orientation = 'column';
    globalOptionsGroup.alignChildren = ['fill', 'top'];
    globalOptionsGroup.margins = 10;

    // Font size
    var fontSizeGroup = globalOptionsGroup.add('group');
    fontSizeGroup.orientation = 'row';
    fontSizeGroup.alignChildren = ['left', 'center'];
    fontSizeGroup.add('statictext', undefined, 'Font Size:');
    var fontSizeInput = fontSizeGroup.add('edittext', undefined, '8');
    fontSizeInput.characters = 5;

    // X offset
    var xGroup = globalOptionsGroup.add('group');
    xGroup.orientation = 'row';
    xGroup.alignChildren = ['left', 'center'];
    xGroup.add('statictext', undefined, 'X Offset:');
    var xOffsetInput = xGroup.add('edittext', undefined, '0');
    xOffsetInput.characters = 5;

    // Y offset
    var yGroup = globalOptionsGroup.add('group');
    yGroup.orientation = 'row';
    yGroup.alignChildren = ['left', 'center'];
    yGroup.add('statictext', undefined, 'Y Offset:');
    var yOffsetInput = yGroup.add('edittext', undefined, '0');
    yOffsetInput.characters = 5;

    // Delete option
    var deleteCheckbox = globalOptionsGroup.add('checkbox', undefined, 'Delete original objects');

    // Container for inputs
    var inputGroup = dialog.add('group');
    inputGroup.orientation = 'column';
    inputGroup.alignChildren = ['fill', 'top'];
    inputGroup.spacing = 5;
    inputGroup.margins = 0;

    // Arrays to store text inputs
    var textInputs = [];

    // Define the number of columns (adjust as needed)
    var numColumns = 2; // You can change this number to suit your preference
    var numRows = Math.ceil(objects.length / numColumns);

    // Create rows
    for (var row = 0; row < numRows; row++) {
        var rowGroup = inputGroup.add('group');
        rowGroup.orientation = 'row';
        rowGroup.alignChildren = ['fill', 'top'];
        rowGroup.spacing = 5;
        rowGroup.margins = 0;

        // Add columns within the row
        for (var col = 0; col < numColumns; col++) {
            var index = row * numColumns + col;
            if (index >= objects.length) {
                break;
            }

            var obj = objects[index];

            var group = rowGroup.add('group');
            group.orientation = 'row';
            group.alignChildren = ['left', 'center'];
            group.spacing = 5;

            // Label for object
            group.add('statictext', undefined, 'Object ' + (index + 1) + ':');

            // Text input
            var textInput = group.add('edittext', undefined, '');
            textInput.characters = 20;
            textInputs.push(textInput);
        }
    }

    // Buttons
    var buttonGroup = dialog.add('group');
    buttonGroup.alignment = 'center';
    buttonGroup.spacing = 10;
    var okButton = buttonGroup.add('button', undefined, 'OK', { name: 'ok' });
    var cancelButton = buttonGroup.add('button', undefined, 'Cancel', { name: 'cancel' });

    // Show dialog
    var result = dialog.show();

    if (result == 1) { // OK pressed
        // Get global options
        var deleteOriginal = deleteCheckbox.value;
        var xOffset = parseFloat(xOffsetInput.text);
        if (isNaN(xOffset)) {
            xOffset = 0;
        }
        var yOffset = parseFloat(yOffsetInput.text);
        if (isNaN(yOffset)) {
            yOffset = 0;
        }
        var fontSize = parseFloat(fontSizeInput.text);
        if (isNaN(fontSize)) {
            fontSize = 8;
        }

        // Default font setup
        var defaultFontName = 'Helvetica';
        var defaultFont;
        try {
            defaultFont = app.textFonts.getByName(defaultFontName);
        } catch (e) {
            alert("Default font Helvetica not found. Please install it or change the default font in the script.");
            return;
        }

        for (var i = 0; i < objects.length; i++) {
            var obj = objects[i].object;
            var textValue = textInputs[i].text;

            // Process the object
            try {
                // Get position of the original object
                var position = obj.position; // [x, y]

                // Create new text frame
                var newText = app.activeDocument.textFrames.add();
                newText.contents = textValue;
                newText.textRange.characterAttributes.size = fontSize;
                newText.textRange.characterAttributes.textFont = defaultFont;

                // Set position with offsets
                newText.position = [position[0] + xOffset, position[1] + yOffset];

                // Delete original object if needed
                if (deleteOriginal) {
                    obj.remove();
                }
            } catch (e) {
                alert('Error processing object ' + (i + 1) + ': ' + e.message);
            }
        }
    }
    // If Cancel pressed or dialog closed, do nothing
}
