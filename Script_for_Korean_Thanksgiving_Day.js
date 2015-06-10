/**
 * @Script for Korean Thanksgiving Day
 *
 * @English version.
 *
 * @author Team_AdS
 */


function newLevel(hasLevel)
{
ModPE.setFoodItem(482,"skull_skeleton",0,15,"Songpyeon")
ModPE.setFoodItem(483,"skull_creeper",0,10,"Injeolmi ")
ModPE.setFoodItem(481,"skull_wither",0,8,"Mujigae_tteok")
ModPE.setFoodItem(480,"skull_steve",0,6,"Kkultteok")
ModPE.setItem(484,"skull_zombie",0,"Beetle")
ModPE.setFoodItem(485,"sugar",0,15,"Rice_flour")
Block.defineBlock(115,"Mortar", [["piston_bottom",0],["piston_bottom",0], ["piston_bottom",0], ["piston_bottom",0], ["piston_bottom",0], ["piston_bottom",0]],5,true,4);
Block.defineBlock(250,"Rice_filled_mortar", [["piston_bottom",0],["piston_bottom",0], ["piston_bottom",0], ["piston_bottom",0], ["piston_bottom",0], ["piston_bottom",0]],5,true,4);
Item.addShapedRecipe(484,1,0,[" W "," S "," W "],["S",280,0,"W",5,0])
Item.addShapedRecipe(115,1,0,["W W","W W","WSW"],["S",1,0,"W",5,0])

//info
clientMessage("Script for Korean Thanksgiving Day");
clientMessage("Made by Team AdS");
clientMessage("type '/how to use' to know about this script");
clientMessage("This script is offered by Team AdS, Do not modify.");
}

function useItem(x, y, z, itemid, blockid, side, itemDamage, blockDamage)
{
if(itemid==485&&blockid==115&&Player.getCarriedItemCount()>=10)
{
print("You put rice flour.");
Level.setTile(x, y, z, 250);
a=Player.getCarriedItemCount();
Entity.setCarriedItem(Player.getEntity(),485,a-10);
}
if(itemid==485&&blockid==250)
{
print("rice flour is already put.");
}

if(itemid==484&&blockid==115)
{
print("There is no rice flour.");
}

if(itemid==484&&blockid==250)
{
r2=Math.floor(Math.random()*15);
if(r2==0)
{
r3=Math.floor(Math.random()*4);

if(r3==0)
{
Level.dropItem(x, y+1, z, 1, 480, 5);
print("You got kkultteok.");
Level.setTile(x, y, z, 115);
}
if(r3==1)
{
Level.dropItem(x, y+1, z, 1, 481, 5);
print("You got Mujigae tteok.");
Level.setTile(x, y, z, 115);
}
if(r3==2)
{
Level.dropItem(x, y+1, z, 1, 482, 5);
print("You got songpyeon.");
Level.setTile(x, y, z, 115);
}
if(r3==3)
{
Level.dropItem(x, y+1, z, 1, 483, 5);
print("You got injeolmi.");
Level.setTile(x, y, z, 115);
}
}
}
}

function destroyBlock(x, y, z, side)
{
if(getTile(x,y,z)==59&&Level.getData(x, y, z)==7)
{
r=Math.floor(Math.random()*3);
if(r==0)
Level.dropItem(x, y, z, 1, 485, 1);
}
}

function procCmd(cmd)
{
if(cmd=='how to use')
{
clientMessage("1. Make a beetle and a mortar.");
clientMessage("2. Put rice flour in a mortar with touching the mortar. (You need 10 rice_flour.)");
clientMessage("3. Touch the mortar with a beetle consecutively.");
}
}
