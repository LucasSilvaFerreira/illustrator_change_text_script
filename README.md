Illustrator JSX Script for Organizing and Editing Selected Objects
This script for Adobe Illustrator allows you to process selected objects in a consistent order and replace them with new text objects. The script provides a compact dialog box where you can:

Input text for each selected object.
Set global options for font size and position offsets.
Delete the original objects after processing.
Features
Consistent Object Ordering: Objects are processed in order based on their positions on the artboard (top-to-bottom, left-to-right), regardless of how they were selected.
Compact Input Layout: Inputs are arranged in a row-first grid to make it easy to correlate fields with objects.
Global Options: Set font size, X and Y offsets, and an option to delete original objects.
Requirements
Adobe Illustrator
ScriptUI Enabled
This script has been tested with Adobe Illustrator CC but should work with most recent versions of Illustrator.

Installation
Save the script as a .jsx file, for example: process_objects_ordered.jsx.
Place the file in the Illustrator Scripts folder:
Windows: C:\Program Files\Adobe\Adobe Illustrator [Version]\Presets\[Language]\Scripts
Mac: /Applications/Adobe Illustrator [Version]/Presets/[Language]/Scripts
Restart Adobe Illustrator.
How to Use
1. Select Objects
Use Illustrator’s selection tools to select the objects you want to process.
The order of processing will depend on the objects' positions:
Top-to-bottom order is prioritized.
Within each row, objects are processed left-to-right.
2. Run the Script
Go to File > Scripts and select the script (process_objects_ordered).
A dialog box will appear with the following options:
Global Options
Font Size: Enter the font size for the new text objects (default is 8).
X Offset: Enter a horizontal offset for the new text objects.
Y Offset: Enter a vertical offset for the new text objects.
Delete Original Objects: Check this box to remove the original objects after processing.
Input Fields
Each selected object will have a corresponding text input field.
Inputs are arranged in rows first and then columns.
3. Apply Changes
Enter the desired values in the dialog box.
Click OK to process the objects or Cancel to exit without making changes.
4. View Results
The selected objects will be replaced with new text objects using the specified input values and global options.
If the "Delete Original Objects" option was selected, the original objects will be removed.
Example Usage
Example Scenario
Select five objects on your artboard, arranged in a grid.
Run the script.
In the dialog:
Enter text for each object in the input fields.
Set a font size of 12.
Set an X offset of 10 and a Y offset of -10.
Check "Delete Original Objects."
Click OK to process the objects.
Output
Each object is replaced by a text object with the specified input values.
Text objects are shifted by the offsets specified in the dialog.
Original objects are deleted (if selected).
