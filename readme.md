XCOM: Enemy Online

In this turn based tactics games, two players go head to head commanding alien invaders or humanity's last line of defense, XCOM. 

To play, load up the game and pick a side. The aliens go first, and have more troops. To compensate, the humans have better range, health, and a single use grenade. Each unit can take two actions each turn, and once your units have no more actions, you pass the turn to the opponent. Attacking or throwing a grenade takes all actions though, so be careful. The game is won when one side has lost all their soldiers. 

The game was made primarily using Javascript, with HTML and CSS combining to make the game board, units, and animations. The main three JS systems implemented were the movement, attack/grenade, and turn/selection systems. The movement system uses 4 buttons to allow units to move up, down, left or right. There are checks implemented to prevent multiple units from occupying the same tile. 

The attacking/grenading system is the most complex, as it uses a range finder, fed into either a grenade function or a method on the unit object. This is one of the areas I would have liked to work on more, as it could be greatly simplified and unified to allow for more abilities. 

The turn/selection systems are relatively simple, but still important in that they track whose turn it is and prevent the selection/commanding of enemy units. 

Perhaps the most useful function written was jsConvert, which was used whenever a dom element needed to modify an object in memory. If I had more time I would write a function to go the other way instead of constantly using jQuery. 

I did not have any specific unsolved problems, but I would have liked to go back over the code and redo it to remove redundant code and standardize function inputs to allow for further expansion of abilities. I would have also liked to add different units and a rank up system, but time constraints forced these to be cut. My process could have also been improved, as my method was generally to dive into the code and get working prototypes which would then be improved on. I need to utilize more pseudocode and planning in the future so that I can have cleaner code from the start.
