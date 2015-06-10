var santa=null;
var tntdrop=0;
var zombies= new Array();
var presentdelay= 0;
 
function newLevel()
{
ModPE.setItem(500,"skull_steve",0,"Spawn Santa")
ModPE.setItem(510,"skull_zombie",0,"Present")
clientMessage("Christmas Santa Script by Team AdS");
}
 
function useItem(x, y, z, itemid, blockid, side, itemDamage, blockDamage)
{
if(itemid==510){
randomp=Math.floor(Math.random()*458+1);
Level.dropItem(getPlayerX(),getPlayerY(),getPlayerZ(),0,randomp,5);
Entity.setCarriedItem(Player.getEntity(),510,Player.getCarriedItemCount()-1,Player.getCarriedItemData());
}
if(itemid==500)
{ //artificial spawn
Entity.remove(santa);
santa=null;
santa=Level.spawnMob(x,y+2,z,15,"/mob/bot.png");
Entity.setHealth(santa,10000);
Entity.setCarriedItem(Player.getEntity(),500,Player.getCarriedItemCount()-1,Player.getCarriedItemData());
clientMessage("<Santa> Hello");
presentdelay=1200;
}
if(Level.getData(x, y, z)==14&&Level.getTile(x, y, z)==35&&Level.getTile(x, y-1, z)==80){ //spawn Santa
Entity.remove(santa);
santa=null;
santa=Level.spawnMob(x,y+2,z,15,"/mob/bot.png");
Entity.setHealth(santa,10000);
Level.setTile(x, y, z,0);
Level.setTile(x, y-1, z,0);
clientMessage("<Santa> Hello");
presentdelay=1200;
}
}
 
function destroyBlock(x, y, z, side)
{
if(Entity.getY(santa) !=0){
if(Level.getTile(x, y, z)==17){ //When you break a wood block
random=Math.floor(Math.random()*5);
if(random==1)
{
clientMessage("<Santa> Oh! You killed my tree ! !");
clientMessage("<Santa> I ' ll give a TNT to you !");
Level.spawnMob(getPlayerX(),getPlayerY(),getPlayerZ(),65);
}
}
}
}
 
function attackHook(attacker,victim)
{
if(attacker==Player.getEntity()&&victim==santa){
random2=Math.floor(Math.random()*2);
if(random2==0){
clientMessage("<Santa> Don't do that");
clientMessage("<Santa> I ' ll give a TNT to you ~");
tntdrop=100;
}
if(random2==1){
clientMessage("<Santa> Ha Ha !");
setVelY(santa,3);
Level.explode(Entity.getX(santa),Entity.getY(santa),Entity.getZ(santa),10);
}
}
if(attacker==Player.getEntity()&&victim !=santa){
random3=Math.floor(Math.random()*5);
if(random3==0){
clientMessage("<Santa> No. No.");
clientMessage("<Santa> Do not hit it.");
 
arrow1=Level.spawnMob(getPlayerX()+1,getPlayerY(),getPlayerZ(),80);
arrow2=Level.spawnMob(getPlayerX()-1,getPlayerY(),getPlayerZ(),80);
arrow3=Level.spawnMob(getPlayerX(),getPlayerY(),getPlayerZ()-1,80);
arrow4=Level.spawnMob(getPlayerX(),getPlayerY(),getPlayerZ()+1,80);
setVelX(arrow1,-1);
setVelX(arrow2,1);
setVelZ(arrow3,1);
setVelZ(arrow4,-1);
}
}
}
 
function modTick()
{
if(santa !=null){
setTile(Entity.getX(santa),Entity.getY(santa),Entity.getZ(santa),78);
}
tntdrop--;
if(tntdrop>0){
Level.spawnMob(getPlayerX(),getPlayerY(),getPlayerZ(),65);
}
for(var len in zombies){
var distance= Math.sqrt(Math.pow(Entity.getX(santa)-Entity.getX(zombies[len]),2)+Math.pow(Entity.getZ(santa)-Entity.getZ(zombies[len]),2)+Math.pow(Entity.getY(santa)-Entity.getY(zombies[len]),2));
if(distance<2){
clientMessage("<Santa> Ahhh! Help me!");
}
}
presentdelay--;
if(presentdelay==0){
clientMessage("<Santa> Merry christmas !");
for(var present=0;present<5;present++){
Level.dropItem(Entity.getX(santa),Entity.getY(santa),Entity.getZ(santa),2,510,2);
}
}
}
 
function entityAddedHook(entity)
{
if(Entity.getEntityTypeId(entity)==32)
{
zombies.push(entity);
}
}
 
 
ModPE.overrideTexture("images/mob/bot.png","http://mblogthumb4.phinf.naver.net/20141225_167/ptkim10_1419494329140TwIvi_PNG/farmer.png?type=w2");
