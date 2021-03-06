class Pet {
  constructor (name) {
    this.name = name;
    this.age = 0;
    this.health = 100;
    this.hunger = 0;
    this.happiness = 100;
  }

  clean () {
    if (this.health < 100 && (this.health + 5 < 100)) {
      this.health += 5;
    }

    this.stats();
  }

  feed () {
    if (this.hunger > 0 && (this.hunger - 5 > 0)) {
      this.hunger -= 5;
    }

    this.stats();
  }

  play () {
    if (this.happiness < 100 && (this.happiness + 5 < 100)) {
      this.happiness += 5;
    }

    this.stats();
  }

  describeAge () {
    const daysOld = this.age === 1 ? 'day old' : 'days old';
    return `${this.age} ${daysOld}`;
  }

  describeName () {
    return `${this.name[0].toUpperCase()}${this.name.slice(1)}`;
  }

  incrementAge () {
    this.age += 1;
    this.stats();
  }

  incrementHunger () {
    this.hunger += 1;
    this.stats();
  }

  decrementHealth () {
    this.health -= 1;
    this.stats();
  }

  decrementHappiness () {
    this.happiness -= 1;
    this.stats();
  }

  isAlive () {
    return this.health > 0;
  }

  stats () {
    document.querySelector('#name').textContent = this.describeName();
    document.querySelector('#age').textContent = this.describeAge();
    document.querySelector('#health').textContent = this.health;
    document.querySelector('#hunger').textContent = this.hunger;
    document.querySelector('#happiness').textContent = this.happiness;
  }
}

const currentPet = new Pet('test');

window.onload = function () {
  currentPet.stats();
  copyright();

  document.querySelector('Button#clean').addEventListener('click', clickClean, false);
  document.querySelector('Button#feed').addEventListener('click', clickFeed, false);
  document.querySelector('Button#play').addEventListener('click', clickPlay, false);

  timer();
};

function clickClean () {
  if (currentPet.isAlive()) {
    currentPet.clean();
    changeFace();
  }
}

function clickFeed () {
  if (currentPet.isAlive()) {
    currentPet.feed();
  }
}

function clickPlay () {
  if (currentPet.isAlive()) {
    currentPet.play();
  }
}

function copyright () {
  const copyrightElement = document.querySelector('#copyright');
  const date = new Date();
  const currentYear = date.getFullYear();
  copyrightElement.innerHTML = `&copy;${currentYear} Jason D. (@eyedarts)`;
}

function timer () {
  let time = 0
  let timer = setInterval(function () {
    if (currentPet.isAlive()) {
      time += 1;
      changesForEachDay();
    }
  }, 1000);
}

function changesForEachDay () {
  currentPet.incrementAge();
  currentPet.decrementHappiness();
  currentPet.incrementHunger();
  currentPet.decrementHealth();

  changeFace();
}

function changeFace () {
  const faceImage = document.querySelector('#pet-image img');

  if (!currentPet.isAlive()) {
    faceImage.src = './src/images/dead.svg';
  } else if (currentPet.health < 35) {
    faceImage.src = './src/images/sick.svg';
  } else if (currentPet.health < 65) {
    faceImage.src = './src/images/sad.svg';
  } else {
    faceImage.src = './src/images/happy.svg';
  }
}
