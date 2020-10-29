let textObject = null;
const width = 1920;
const height = 1080;
const phrases = [
  'downloading streamer container ...',
  'downloading apucontilde image ...',
  'launching STREAMER:apucontilde ...',
];
const phraseShiftDelta = 5000; // Every 2s, change phrase
let phrase = 0;
let lastPhraseShift = null;

function update(time, delta) {
  console.log('lastPhraseShift + phraseShiftDelta ', lastPhraseShift + phraseShiftDelta);
  console.log('time ', time);
  if (time >= (lastPhraseShift + phraseShiftDelta)) {
    console.log('changing phrase..')
    phrase = phrase + 1;
    if(phrase == phrases.length){
      phrase = 0;
    }
    textObject.text = phrases[phrase];
    lastPhraseShift = time;
    console.log('phrase idx', phrase);
    console.log(phrases[phrase]);
  }
  textObject.x -= delta / 2;
  if (textObject.x < (textObject.displayWidth *-1)) {
    textObject.x = width;
  }
}

function create() {
  textObject = this.add.text(
    textObject ? textObject.x : 0,
    textObject ? textObject.y : 0,
    phrases[phrase],
    {
      font: '164px Roboto Mono Bold',
      fill: '#ffffff',
    },
  );

  textObject.x = width / 2 - textObject.displayWidth / 2;
  textObject.y = height / 2 + textObject.displayHeight;
}

const phaserGame = new Phaser.Game({
  type: Phaser.WEBGL,
  scale: {
    mode: Phaser.Scale.FIT,
    width,
    height,
  },
  transparent: true,
  scene: {
    update,
    create,
  },
});

const handleDestroy = () => {
  console.log('destroying');
};

phaserGame.events.on('DESTROY', handleDestroy);
