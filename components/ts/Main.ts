import greeter from './greeter';
import $ = require('jquery');
import * as Box2dweb from 'box2dweb-commonjs';


/**
 *  Build Box2d Model
 */
export default class Main {
  private gravity: Box2dweb.b2Vec2;
  private world: Box2dweb.b2World;
  private debugDraw: Box2dweb.b2DebugDraw;
  private scale:number;
  private context:CanvasRenderingContext2D;
  private dtRemaining:number;
  private stepAmt:number;
  private lastFrame:number;

  constructor (elem:string, debug:Boolean ,scale:number){
    // TypeScript uses '<>' to surround casts
    var cvs = <HTMLCanvasElement>document.getElementById(elem);
    this.gravity = new Box2dweb.b2Vec2(0,9.8);
    this.world = new Box2dweb.b2World(this.gravity,true);
    this.scale = scale || 30;
    this.context = cvs.getContext("2d");
    this.stepAmt = 1/60;
     this.dtRemaining = 0;
    this.lastFrame = new Date().getTime();
    if(debug){
      this.debug();
    }
    $("#msg").html(greeter("Webpack"));
   //$(() => {$("#msg").html(greeter("Webpack"));});
   this.init();
  }

  debug () {
    this.debugDraw = new Box2dweb.b2DebugDraw();
    this.debugDraw.SetSprite(this.context);
    this.debugDraw.SetDrawScale(this.scale);
    this.debugDraw.SetFillAlpha(0.3);
    this.debugDraw.SetLineThickness(1.0);
    this.debugDraw.SetFlags(Box2dweb.b2DebugDraw.e_shapeBit | Box2dweb.b2DebugDraw.e_jointBit);
    this.world.SetDebugDraw(this.debugDraw);
  }

  step (dt){
    this.dtRemaining += dt;
    while (this.dtRemaining > this.stepAmt) {
       this.dtRemaining -= this.stepAmt;
       this.world.Step(this.stepAmt,
       8, // velocity iterations
       3); // position iterations
     }
     if (this.debugDraw) {
       this.world.DrawDebugData();
     }
  }

  createFloor(){
    //A body definition holds all the data needed to construct a rigid body.
    var bodyDef = new Box2dweb.b2BodyDef();
    bodyDef.type = Box2dweb.b2Body.b2_staticBody;
    bodyDef.position.x = 600/2/this.scale;
    bodyDef.position.y = 300/this.scale;
    // A fixture is used to attach a shape to a body for collision detection.
    // A fixture definition is used to create a fixture.
    var fixtureDef = new  Box2dweb.b2FixtureDef();
    fixtureDef.density = 1.0;
    fixtureDef.friction = 0.5;
    fixtureDef.restitution = 0.2;
    var shape = new Box2dweb.b2PolygonShape();
    fixtureDef.shape = shape;
    shape.SetAsBox(300/this.scale,10/this.scale); //640 pixels wide and 20 pixels tall

    var body = this.world.CreateBody(bodyDef);
    var fixture = body.CreateFixture(fixtureDef);
  }

  init (){
    var _self = this;
    this.createFloor();
    requestAnimationFrame(_self.Render);
  }

  // Use () => syntax so Render always gets 'this' context
  // from the class instance
  Render = () => {
    var tm = new Date().getTime();
    requestAnimationFrame(this.Render);
    var dt = (tm - this.lastFrame) / 1000;
    if(dt > 1/15) {
       dt = 1/15;
    }
    this.step(dt);
    this.lastFrame = tm;
  }
}
