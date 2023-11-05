const elementoInsercaoSkills = document.getElementById("skills");
gerarSkills();

async function gerarSkills(){
    const responseJsonSkills = await fetch("assets/json/skills.json");
    const skills = await responseJsonSkills.json();
    exibirSkillsCircule(skills);
}

function exibirSkillsCircule(skills){
    elementoInsercaoSkills.innerHTML = '';

    skills.forEach(skill => {
        elementoInsercaoSkills.innerHTML += `
        <li>
            <h3 class="skills-group__title neon">${skill.titulo}</h3>
            <div class="circle-chart surface-variant">
                <div class="circle-chart-icon-background"></div>
                <svg class="circle-chart-background-icon neon surface-variant-filter" role="img" aria-label="Acesse o meu perfil do Instagram"><use xlink:href="assets/img/icons.svg#${skill.idicon}"/></svg>                
                <div class="circle-chart-background surface"></div>
                <div class="percentage-bar" style="background: conic-gradient(var(--start-percentagem-bar-color) 0%, var(--end-percentagem-bar-color) ${skill.percentagem}%, transparent 0% 100%);"></div>
            </div>
            <!--<h3 class="skills-group__percentagem neon">${skill.percentagem}%</h3>-->
        </li>
        `;
    });
}