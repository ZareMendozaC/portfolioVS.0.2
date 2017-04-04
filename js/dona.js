(function(){
  
  var skillBar = {}, demoBar;

  if (!(window.CSS && CSS.supports('display', 'var(--customProperties)'))){
      return;
  }
  
  skillBar.init = function(skillBar){ 
      
      this.skillBar = skillBar;
      this.valueBox = this.skillBar.querySelector('.js-skillbar__value');
      this.progress = this.skillBar.querySelector('.js-skillbar__progress-value');
      this.styles = window.getComputedStyle(this.skillBar);
      this.circumference = 2 * Math.PI * ((this.styles.getPropertyValue('--skillBarRadius') * this.styles.getPropertyValue('--skillBarSize')) / 100);
    
      this.skillBar.style.setProperty('--skillBarPercent', this.circumference);
      this.skillBar.style.setProperty('--skillBarCircumference', this.circumference);
          
      return this;
  };
  
  skillBar.draw = function(){
    
    var skillBarValue = this.styles.getPropertyValue('--skillBarValue'),
    progressValue = this.circumference - ((100 - skillBarValue * this.circumference) / 100);
    
    this.progress.classList.add('js-skillbar__progress-value_animated');
    this.skillBar.style.setProperty('--skillBarPercent', progressValue);
    this.valueBox.textContent = skillBarValue + "%";
  };

  demoBar = skillBar.init(document.querySelector('.js-skillbar'));
  demoBar.draw();
  
  function updateSkillBar(){
    
    demoBar.skillBar.style.setProperty('--skillBarValue', this.getAttribute('data-skill-bar-value'));
    demoBar.skillBar.style.setProperty('--skillBarColor', this.getAttribute('data-skill-bar-color'));
    demoBar.draw();    
  }
  
  document.querySelectorAll('.js-switch').forEach(function(item){
    item.addEventListener('change', updateSkillBar);
  });
})();


