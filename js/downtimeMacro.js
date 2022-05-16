let pf1Downtime = {
	
	DowntimeActivities: async function(){
		if(canvas.tokens.controlled.length > 0){
			for(let token of canvas.tokens.controlled){
				await this.CreateDowntimeDialog(token.actor);
			}
		}else if(game.user.character != null){
			let token = game.user.character;
			await this.CreateDowntimeDialog(token.actor);
		}

	},
	CreateDowntimeDialog: async function(actor){
		let skills = Object.keys(actor.data.data.skills);
		let dialog_options = (skills[0] instanceof Array)
			? skills.map(o => `<option value="${o[0]}">${o[1]}</option>`).join(``)
			: skills.map(o => `<option value="${o}">${CONFIG.PF1.skills[o]}</option>`).join(``);
		let d = new Dialog({
			title: "DowntimeActivities",
			content: `<table border="1" cellpadding="5"><caption>Table: Capital Values</caption>
						<thead>
							<tr>
								<th class="text">Capital</th>
								<th class="text">Purchased Cost</th>
								<th class="text">Earned Cost</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="text">Goods</td>
								<td class="money number">20 gp</td>
								<td class="money number">10 gp</td>
							</tr>
							<tr>
								<td class="text">Influence</td>
								<td class="money number">30 gp</td>
								<td class="money number">15 gp</td>
							</tr>
							<tr>
								<td class="text">Labor</td>
								<td class="money number">20 gp</td>
								<td class="money number">10 gp</td>
							</tr>
							<tr>
								<td class="text">Magic</td>
								<td class="money number">100 gp</td>
								<td class="money number">50 gp</td>
							</tr>
						</tbody>
					</table>
					<table border="1" cellpadding="5"><caption>Table: Skilled Capital Earnings</caption>
						<thead>
							<tr>
								<th class="text"><a href="https://www.d20pfsrd.com/basics-ability-scores/glossary#TOC-Skill-Check">Skill Check</a> Result</th>
								<th class="text">Capital Earned<sup>*</sup> (Goods, Influence, Labor, Or Magic)</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="number">10</td>
								<td class="number">1</td>
							</tr>
							<tr>
								<td class="number">20</td>
								<td class="number">2</td>
							</tr>
							<tr>
								<td class="number">30</td>
								<td class="number">3</td>
							</tr>
							<tr>
								<td class="number">40</td>
								<td class="number">4</td>
							</tr>
						</tbody>
					</table>
					<br><select id="activity">
						<option value=""></option>
						<option value=""></option>
					</select>
					Choose Skill : <br><select id="skill">${dialog_options}</select>`,
			buttons: {
				one: {
					icon: '<i class="fas fa-check"></i>',
					label: "Option One",
					callback: () => console.log("Chose One")
				},
				two: {
					icon: '<i class="fas fa-times"></i>',
					label: "Option Two",
					callback: () => console.log("Chose Two")
				}
			},
			default: "two",
			render: html => console.log("Register interactivity in the rendered dialog"),
			close: html => console.log("This always is logged no matter which option is chosen")
		});
		d.render(true);
	}
};

/*

async function choose(options = [], prompt = ``)
{
  let value = await new Promise((resolve, reject) => {

    let dialog_options = (options[0] instanceof Array)
      ? options.map(o => `<option value="${o[0]}">${o[1]}</option>`).join(``)
      : options.map(o => `<option value="${o}">${o}</option>`).join(``);
  
    let content = `${prompt}<br><select id="choice">${dialog_options}</select>`;
  
    new Dialog({
      content, 
      buttons : { OK : {label : `OK`, callback : async (html) => { resolve(html.find('#choice').val()); } } }
    }).render(true);
  });
  return value;
}

(async ()=>{ 
  if(!token) return ui.notifications.error(`Please select a token.`);

  const abilities = Object.entries(CONFIG.PF1.abilities);
  const savingThrows = Object.entries(CONFIG.PF1.savingThrows);
  const skills = Object.entries(CONFIG.PF1.skills);

  let type_choice = await choose(["ability", "saving throw", "skill"], `Choose Type of Roll : `);
  let choice;

  switch(type_choice)
  {
    case "ability" :
      choice = await choose(abilities, `Choose Ability : `);
	  for(var tok of canvas.tokens.controlled)
		tok.actor.rollAbility(choice);
      break;
    case "saving throw" :
      choice = await choose(savingThrows, `Choose Saving Throw : `);
      for(var tok of canvas.tokens.controlled)
		tok.actor.rollSavingThrow(choice);
      break;
    case "skill" :
      choice = await choose(skills, `Choose Skill : `);
      for(var tok of canvas.tokens.controlled)
		tok.actor.rollSkill(choice);
      break;
  }
})();
*/
/*
let pf1Downtime = {
	
	DowntimeActivities: async function(){
		if(canvas.tokens.controlled.length > 0){
			for(let token of canvas.tokens.controlled){
				await this.CreateDowntimeDialog(token.actor);
			}
		}else if(game.user.character != null){
			let token = game.user.character;
			await this.CreateDowntimeDialog(token.actor);
		}

	},
	CreateDowntimeDialog: async function(actor){
		let dialog_options = (pf1Downtime.DowntimeOptions[0] instanceof Array)
			? pf1Downtime.DowntimeOptions.map(o => `<option value="${o[0]}">${o[1]}</option>`).join(``)
			: pf1Downtime.DowntimeOptions.map(o => `<option value="${pf1Downtime.DowntimeOptions.indexOf(o)}">${o}</option>`).join(``);
		let d = new Dialog({
			title: "DowntimeActivities",
			content: `<select id='downtimeActivity' onchange="pf1Downtime.appendText()">${dialog_options}</select>
						<p id='downtimeDescriptionBox'>${pf1Downtime.DowntimeDescriptions[0]}</p>
					`,
			buttons: {
				one: {
					icon: '<i class="fas fa-check"></i>',
					label: "Option One",
					callback: () => console.log("Chose One")
				},
				two: {
					icon: '<i class="fas fa-times"></i>',
					label: "Option Two",
					callback: () => console.log("Chose Two")
				}
			},
			default: "two",
			render: html => console.log("Register interactivity in the rendered dialog"),
			close: html => console.log("This always is logged no matter which option is chosen")
		});
		d.render(true);
	},
	DowntimeOptions: [
		"Add Spells to Your Spellbook",
		"Alibi",
		"Blackmail",
		"Coerce",
		"Construct Buildings",
		"Craft Magic Items",
		"Craft Mundane Items",
		"Earn Capital",
		"Earn XP",
		"Enforce Order",
		"Gather Information",
		"Heal Others",
		"Heist",
		"Infiltrate",
		"Lead Your Kingdom",
		"Promote a Business",
		"Replace Your Animal Companion",
		"Replace Your Familiar",
		"Recruit for an Organization",
		"Research a Spell",
		"Research Facts and Lore",
		"Rest",
		"Retrain",
		"Run a Business",
		"Scheme for an Upcoming Adventure",
		"Smuggle",
		"Street Violence",
		"Train an Animal",
		"Transport"
	],
	DowntimeDescriptions: [
		`If you use a spellbook you can spend 1 day of downtime to copy up to eight spells from other sources into your spellbook (see Spells Copied from Another’s Spellbook or a Scroll). If you’re an alchemist, you can use this option to add new formulae to your formula book. If you’re a witch, you can use this option to add spells to your familiar. You may spend Magic toward the cost of copying spells.`,
		`With a successful DC 15 Bluff or Influence check, you or a team can spend 1 day of downtime to interfere with a current or future investigation. This applies a +2 bonus to any Bluff check to convince others you were uninvolved in a specific event of your choice that happened in the past 48 hours or will happen within 24 hours. You can spend 1 point of Influence to increase this bonus to +5.`,
		`You can spend 1 day of downtime to learn an incriminating secret about someone. To learn a secret about your target, you or a team must succeed at a Diplomacy (gather information) or Influence check with a DC equal to 10 + target’s Hit Dice + the target’s Charisma modifier. On a successful check, you can pay 10 gp per Hit Die to learn the secret.

You can reveal this secret at any time to gain a +5 circumstance bonus on a single Intimidate check against your target. On a successful check, the target’s attitude remains friendly toward you for 1d6 days, rather than 1d6 × 10 minutes, then degrades by one category each day until the target’s attitude become hostile. Alternatively, you can reveal a secret while coercing your target (see below) to automatically succeed at your Intimidate check to coerce that target. Once a secret has been revealed, you can’t use it again.`,
		`You or your team uses 1 day of downtime to browbeat a person or team with a successful Intimidate or Influence check (DC = 15 + target’s Hit Dice + target’s Wisdom modifier).

If you succeed, you can coerce the foe to perform a downtime activity on your behalf, or no activity for 1 day. Whether you succeed or fail, the target’s attitude becomes unfriendly.`,
		`You can use your downtime capital to create a building that suit your needs, such as a temple, guildhall, or mage tower. You construct a building out of component rooms that allow you to configure the building exactly how you want it (see Rooms and Teams).

How much capital you can spend per day is limited by the size of the settlement you’re in (see Spending Limits). Once you’ve spent the total capital and time needed to finish your building, it’s complete and you can use it immediately.`,
		`The standard rules detail how to craft magic items. As magic item crafting and the downtime rules both use days as time increments for all but the cheapest potions and scrolls, you can spend days in the downtime system to craft magic items, with each downtime day counting as 8 hours of crafting time. You may spend Magic toward the crafting cost.`,
		`The Craft skill allows you to spend time creating mundane items such as armor, weapons, and alchemist’s fire. The standard rules assume you spend a week on crafting, but give you the option to make progress by the day. If you use the downtime system, make your Craft checks by the day instead of by the week. The steps for crafting by day are as follows.

Find the item’s price in silver pieces (1 gp = 10 sp).
Find the item’s DC from Table: Craft Skills.
Pay 1/3 of the item’s price in gp for the raw material cost. You may also spend Goods toward this cost.
Attempt an appropriate Craft check representing 1 day’s worth of work. You may spend Labor to modify your check result, with 1 point of Labor adding 2 to your total.
If your check succeeds, multiply your check result by the DC and divide by 7. If this value equals or exceeds the price of the item in sp, then you complete the item. If the result × the DC equals double or triple the price of the item in silver pieces, then you’ve completed the task in 1/2 or 1/3 of the time. Other multiples of the DC reduce the time in the same manner.

If the value is less than the price, the check represents the progress you’ve made this day. Record the result of your check. Each downtime day you spend crafting, you make more progress until your total reaches the price of the item in silver pieces.

If you fail a check by 4 or less, you make no progress that day. If you fail by 5 or more, you ruin some of the raw materials and have to pay 1/10 of the original raw material cost again.`,
		`You can spend 1 day of downtime earning capital. Depending on the nature of the work, this might require making some kind of check and paying an amount of gp. This work might be unskilled labor or skilled labor with a Craft or Profession skill. See Gaining Capital for more information.`,
		`If you’ve missed a campaign session or otherwise fallen behind in XP compared to the other characters, you can spend downtime adventuring to help catch up to the other PCs. Usually downtime adventures feature encounters that are much easier than you’d normally expect as part of a group. For example, a 5th-level character might clear zombies out of a crypt or assist some lower-level adventurers with a problem that’s a little too difficult for them.

Spending 1 day of downtime adventuring earns you XP as if you had defeated an opponent whose CR was equal to your character level. For example, if you are a 3rd-level character, you would earn 800 XP. You do not earn any treasure or other capital for downtime adventuring.

If using this downtime activity would increase your XP above the highest XP value among all the PCs in your party, it increases your XP to that value instead; any XP earned beyond this amount is lost. This activity allows you only to catch up, not to get ahead.`,
		`Your team keeps the black market relatively safe for customers and vendors for 1 day. Enforcing order requires a successful Influence or Labor check against the black market’s access DC. Success raises the black market’s Law modifier by 2 and reduces its Danger by 10 for 24 hours. While your agents enforce order, merchants and patrons might approach you to resolve internal disputes or address outside concerns (such as unaligned thieves or nosy guards).`,
		`Using the Diplomacy skill to gather information normally requires 1d4 hours to search for rumors and informants. When using the downtime system, you have three options for gathering information.

Standard Check: Once per day, you may spend 1d4 hours speaking with locals and attempt one check, as described in the Diplomacy skill. Doing so does not cost you any downtime, but the GM might rule that other time-consuming downtime activities take a penalty (such as a –4 on a skill check) or can’t be undertaken.

Thorough Questioning: By spending 1 day of downtime, you can thoroughly converse with several knowledgeable or reliable contacts over the course of the day. You may attempt up to three Diplomacy checks to gather information. These checks can be for the same or different topics, and you can expend one of the rolls you haven’t used yet to reroll a Diplomacy check you failed during this activity.

Influential Questioning: By spending 1 day of downtime and 1 point of Influence, you can attempt up to three Diplomacy checks, each with a +5 bonus. These checks can be for the same or different topics, and you can expend one of the rolls you haven’t used yet to reroll a Diplomacy check you failed during this activity.`,
		`You can use downtime to help others rest and recover using the Heal skill. For long-term care, treating wounds, and treating disease, you can spend Labor to modify your check result. Each 1 point of Labor spent adds 2 to your check.

Long-Term Care: Spending a day of downtime on long-term care allows you to care for up to six patients that day.

Treat Wounds from Caltrops, Spike Growth, or Spike Stones: Spending a day of downtime allows you to treat up to 50 patients of this type. You may combine this option with the treat disease option, caring for up to 50 total patients per day.

Treat Deadly Wounds: Spending a day of downtime allows you to treat up to 8 patients of this type.

Treat Disease: Spending a day of downtime allows you to treat up to 50 patients of this type. You may combine this option with the treat wounds from caltrops option, caring for up to 50 patients total per day.`,
		`One or more of your loyal teams infiltrate (see below) an organization or property to steal valuables or information.

You must spend 1 day of downtime and succeed at an Appraise or Sense Motive check (DC = 20 + settlement or black market’s Law modifier) to assemble the ideal recruits and provide them the necessary information on their target.

At any point in the next week, your assembled team or teams can perform their heist, attempting a check to earn capital as if performing skilled work. Because this capital is stolen from another organization, you do not need to pay the associated gp cost for earning capital. Assembled teams must succeed at a DC 20 check to earn capital, or else they fail and are reported or broken up. Performing a heist to generate Magic capital imposes a –5 penalty on this check.

Regardless of the result, your target suspects your involvement. Blame can be deflected with a successful Bluff check, which may benefit from an alibi (above) or manipulating evidence.

To perform a heist without arousing too much suspicion, your team must first infiltrate it (see below).`,
		`You spend 1 day of downtime to insert one of your teams into another organization to feed you information or steal resources. Doing so requires a successful Disguise or Bluff check against a DC of 20, modified by the settlement or black market’s Crime (for criminal organizations), Law (for law enforcement and military organizations), or Society (for governments and businesses) modifier. While infiltrating another organization, your team can attempt checks to earn capital on your behalf, using any non-team bonuses provided by the infiltrated organization’s facilities and resources; you must still pay any associated cost for earning capital. Alternatively, your team can spend 1 day of downtime to attempt a check to earn capital and treat the result as a Diplomacy check to gather information regarding the organization, reporting the discoveries to you.

An infiltrating team remains ensconced for 1 week, plus 1 week if you succeeded at your initial check by 5 or more. You can perform the infiltrate activity up to once per week to maintain a team’s infiltration for extended periods. An infiltrating team can perform no other downtime activities on your behalf.

Instead of earning capital or gathering information, an infiltrating team can spend 1 day to perform a heist (see above). This ends the infiltration, but deflects any suspicion away from you or your organization; the target of the heist must succeed at a DC 20 Perception check (modified by the earning bonus your team used) to find any evidence of your involvement. Targets that fail their Perception checks by 5 or more don’t realize they were robbed.`,
		`If you are using the kingdom-building rules and have a leadership role in the kingdom, you must spend 7 days per month performing various leadership duties. In the downtime system, performing leadership duties for a day costs 1 day of downtime. You can’t perform any other downtime activities on a day you perform kingdom leadership duties.`,
		`You can spend 1 day of downtime to increase interest in a business, temple, organization, or other local fixture. You can also spend one type of capital, depending on how you want to promote the business. For example, if you want to promote a bakery, you can spend Goods giving out free pastries to people in town, Influence to get the mayor to visit the bakery and praise its food, Labor to hire workers to stand with signboards advertising the bakery, or Magic for a memorable illusion that draws people to the bakery.

The promotion increases activity at the site for 1d6 days. Choose one capital the building generates, then attempt a skill check for using skilled work to earn capital, using Diplomacy, Knowledge (local), or Spellcraft. Add 5 to your check result for every 1 point of Goods, Influence, Labor, or Magic you spent to promote the business, then use the skilled work option to determine how many additional resources the business generates over the course of this increased activity. If you’re promoting an organization without a physical building, each Good, Influence, Labor, or Magic adds only 2 to the check instead of 5 — it’s harder to encourage people to be patrons of something they can’t physically visit.

The business you promote with this downtime activity doesn’t have to be one you own.

If the building or organization does not generate capital (such as charity that takes care of war orphans), the promotion generates either gp or Influence (your choice) .`,
		`If you lose or dismiss your animal companion, you can spend 1 day performing a ceremony to gain a new one. This ceremony requires 24 uninterrupted hours of prayer in the environment where the new companion typically lives (at the GM’s discretion, traveling might add to the downtime requirement if there’s no suitable environment near the settlement).`,
		`The standard rules allow you to replace a familiar if at least 1 week has passed since it was dismissed or lost. Doing so requires you to spend 1 day performing a specialized ritual to summon a new familiar. The ritual costs 200 gp × your wizard or witch level. You can spend Goods or Magic toward the ritual cost.`,
		`You can create and recruit for an organization that doesn’t rely on a specific building. For example, you could may want to recruit employees (or minions) if you’re a rogue and want to start your own gang of cutpurses or a cleric who wants to start a cult of followers. You create an organization out of component teams, so you can configure the organization exactly how you want it (see Rooms and Teams). How much downtime capital you can spend in a day is limited by the size of the settlement you’re in (see Spending Limits). When you’ve spent the appropriate capital and time for your organization, it’s complete and you can put it to work immediately.`,
		`The standard rules allow you to perform spell research, either to create a new spell or learn an existing spell from another source. In the downtime system, the steps for spell research each day are as follows.

Pay 100 gp × the spell’s level for research costs and rare ingredients. You may spend Goods or Magic toward this cost.
Determine the total days of progress required to complete the research, which is 7 × the spell level.
Determine the spell research DC, which is 10 + twice the spell’s level.
Attempt a Spellcraft check and a Knowledge check (arcana for an arcane spell, religion for a divine spell) against the spell research DC. You can’t take 10 on these checks. You may spend Magic to modify a check result, with 1 point of Magic adding 2 to your total (maximum +10). If both checks succeed, you make 1 day’s progress toward completing the spell. When your days of progress equal the total number of days needed, the spell is completed and added to your spellbook or list of spells known.
If either or both spell research checks fail by 4 or less, you make no progress. For each check that fails by 5 or more, your research has led to poor results and you lose a day of progress toward completing the spell.

If you’re an alchemist, you can use this downtime option to research a new extract formula. Instead of a Spellcraft check, attempt a Craft (alchemy) check. For Knowledge (arcana) checks, you may attempt a Knowledge (nature) check instead.`,
		`You can use downtime and capital to learn more about the campaign or the game world. This is similar to the gather information activity, except instead of looking for rumors and gossip in town, you are consulting with sages, perusing historical documents, or using magic to unearth information. Instead of a Diplomacy check, attempt one or more Knowledge checks appropriate to the intended subject. These checks can be for the same or different topics (and can use different Knowledge skills), and you can expend one of the rolls you haven’t used yet to reroll a Knowledge check you failed during this activity. You have three options for researching information.

Thorough Research: By spending 1 day of downtime, you can thoroughly converse with several knowledgeable individuals or study several reliable sources over the course of the day. You can attempt up to three Knowledge checks to discover information.

Influential Research: By spending 1 day of downtime and 1 point of Influence, you may attempt up to three Knowledge checks, each with a +5 bonus.

Magical Research: By spending 1 day of downtime and 1 point of Magic, you may attempt up to three Knowledge checks, each with a +5 bonus.`,
		`You can use downtime to rest and recover. It is assumed that you spend 8 hours resting at night, which allows you to recover 1 hp per level per day and 1 point of ability damage for each affected ability score. If you spend a full day of downtime resting in bed, you recover another 1 hp per level per day and another 1 point of ability damage for each affected ability score.`,
		`You can use your downtime to retrain (see Retraining). You may spend Goods, Influence, Labor, or Magic toward this cost.`,
		`If you have a building and that building generates any kind of capital, you can spend 1 day of downtime working at your building—increasing its productivity by inspiring your employees to work harder, using your expertise to get more done, or using your fame to attract more customers. This counts as using downtime to earn capital (see ), but you gain a +10 bonus on your check.

The capital you generate must be a kind that your building can generate. For example, an inn that generates gp and Influence can generate only those two currencies using this downtime activity; you can’t use it to generate Goods, Labor, or Magic just because you’re personally running it for the day. You must earn capital acquired in this way as normal.`,
		`You can use downtime to prepare for an upcoming adventure or event. For example, if you know you have to crash the baron’s fancy party in 2 days, you can spend downtime watching the baron’s manor, investigating what clothing the servants will wear, and finding out which important guests are attending. This works like spending capital to boost checks, except you must spend 1 day of downtime, and each Good, Influence, Labor, or Magic you spend toward this purpose gives you a +2 bonus on one skill check (maximum +6). As with the spend capital option, the GM decides if your approach is reasonable for the check you’re attempting. The bonus from this activity stacks with that from the spend capital to boost checks option (maximum +10 total). This bonus lasts for one check.

For example, by spending 1 day of downtime and 1 point of Goods, you gain an excellent understanding of the liveried servants’ uniforms and add 2 to your Disguise check to disguise yourself as one of them. By spending 1 day of downtime and 1 point of Influence, you learn what famous trapsmith constructed the baron’s vault and add 2 to your Disable Device check to open it.`,
		`Your team performs a transport activity (see below), but moves illegal goods or circumvents normal taxes and fees. Smuggling adds 1 additional day to the travel time, and the final downtime activity check DC is modified by the settlement’s Law modifier.`,
		`You order a team to capture, intimidate, or slay a target team or creature with a CR at least 3 less than your character level. With a successful Labor check against a DC of 11 + double the target’s CR or earning bonus, the target creature or team is intimidated or injured, and is unable to engage in any downtime activities for 1d6 days. If your team succeeds by 5 or more, the target creature is instead captured or killed, or the target team is broken up.`,
		`You can use the Handle Animal skill to train an animal. The rules for training assume the training period is continuous. However, you can break this training into smaller increments (allowing you to make progress on this training between adventures), but you must attempt a Handle Animal check for each training period, and the DC increases by 2. Failing the check means that training period doesn’t count toward completing the training.

This use of downtime doesn’t allow you to exceed the animal’s normal training limitations. For example, spending downtime doesn’t allow you to teach an animal more tricks than it could learn if you weren’t using the downtime system.

Teach an Animal a Trick: This requires 7 days and a successful Handle Animal check at the end of the training period. You may spend Goods, Influence, Labor, or Magic to modify your check result, with each 1 point of capital adding 2 to your total (maximum +10). The DCs and specific tricks are detailed on the Handle Animal page.

Train an Animal for a General Purpose: This sort of training can take several weeks, depending on the nature of the training. You may spend Goods, Influence, Labor, or Magic to modify your check result, with each 1 point of capital adding 2 to your total (maximum +10).

Rear a Wild Animal: Depending on the maturation rate of the animal, this can take anywhere from weeks to months or even years. For simplicity’s sake, interacting with the animal for an hour per day in a safe environment counts toward this training and doesn’t require you to spend any downtime. As long as you maintain this daily contact, you need to succeed at only one Handle Animal check at the end of the rearing period. An interruption requires you to succeed at a check to continue the rearing (you may attempt this check once per day). The assumption is that you have a non-expert taking care of the animal’s basic needs while you are away so it isn’t neglected. If you know you will miss a day of this contact, you may spend 1 point of Influence or 1 point of Labor for each missed day to have a skilled animal handler rear the animal for the day, meaning your absence doesn’t count as an interruption in the animal’s training.`,
		`You dispatch a team to move specific items, people, or capital from one place or organization to another. The team becomes unavailable for the duration of the trip (minimum 1 day). At the end of its journey, a successful downtime activity check by the assigned team (DC = 5 + days traveled) means their goods arrived safely and intact. On a failure, the team is robbed or skims off the top, losing half the cargo’s value. If its check fails by 5 or more, the team breaks up or goes rogue, and you lose both the team and the valuables it was transporting.`
	],
	appendText: function(){
		let selectField = pf1Downtime.xPath("//select[@id='downtimeActivity']");
		pf1Downtime.xPath("//p[@id='downtimeDescriptionBox']").innerText = pf1Downtime.DowntimeDescriptions[selectField.value];
		let dialogBox = pf1Downtime.xPath("//div[@class='app window-app dialog']");
		dialogBox.style.height = "auto";
	},
	xPath: function (input){
		return document.evaluate(input,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue
	}
};

*/


let sheetId = "1OnVp8mTgYzhw3QMffNfrnLnPFnHlxM6tCTGJ3MYe6K4";

function SetSheetId(id){
	
}

//*****************************************************************************************************************************************************
//Kingdom Building
//*****************************************************************************************************************************************************
function StartKingdomDowntime(){
	/*
	let d = new Dialog({
		title: "Kingdom Downtime: ",
		content: `
			<p>Do you control any hexes?</p>
		`,
		buttons: {
			yes: {
				icon: '<i class="fas fa-check"></i>',
				label: "Yes",
				callback: () => {
					UpkeepPhase();
				}
			},
			no: {
				icon: '<i class="fas fa-times"></i>',
				label: "No",
				callback: () => {
					
				}
			}
		},
		default: "two",
		render: html => console.log("Register interactivity in the rendered dialog"),
		close: html => console.log("This always is logged no matter which option is chosen")
	});
	d.render(true);
	*/
	GoToPhaseStep("Upkeep",1);
}

function GoToPhaseStep(phase, step){
	switch(phase.toLowerCase()){
		case "upkeep":
			UpkeepPhase(step);
		break;
		case "edict":
			EdictPhase(step);
		break;
		case "income":
			IncomePhase(step);
		break;
		case "event":
			EventPhase(step);
		break;
	}
}

async function GetVacantPositions(){
	let kingdomData = (await GetKingdomData())[0];
	let ret = [];
	kingdomData["ruler"] == "" ? ret.push("Ruler") : null;
	kingdomData["ruler 2"] == "" ? ret.push("Ruler 2") : null;
	kingdomData["consort"] == "" ? ret.push("Consort") : null;
	kingdomData["councilor"] == "" ? ret.push("Councilor") : null;
	kingdomData["general"] == "" ? ret.push("General") : null;
	kingdomData["grand diplomat"] == "" ? ret.push("Grand Diplomat") : null;
	kingdomData["heir"] == "" ? ret.push("Heir") : null;
	kingdomData["high priest"] == "" ? ret.push("High Priest") : null;
	kingdomData["magister"] == "" ? ret.push("Magister") : null;
	kingdomData["marshal"] == "" ? ret.push("Marshal") : null;
	kingdomData["royal enforcer"] == "" ? ret.push("Royal Enforcer") : null;
	kingdomData["spymaster"] == "" ? ret.push("Spymaster") : null;
	kingdomData["treasurer"] == "" ? ret.push("Treasurer") : null;
	kingdomData["viceroy"] == "" ? ret.push("Viceroy") : null;
	kingdomData["warden"] == "" ? ret.push("Warden") : null;
	return ret;
}

//*****************************************************************************************************************************************************
//Phase 1—Upkeep: Check your kingdom’s stability, pay costs, and deal with Unrest (see below).
//*****************************************************************************************************************************************************
//If your kingdom controls 0 hexes, skip the Upkeep Phase and proceed to the Edict Phase.
/*

During the Upkeep Phase, you adjust your kingdom’s scores based on what’s happened in the past month, how happy the people are, how much they’ve consumed and are taxed, and so on.

Step 1—Determine Kingdom Stability: 
		Attempt a Stability check. If you succeed, Unrest decreases by 1 (if this would reduce Unrest below 0, add 1 BP to your Treasury instead). 
	If you fail by 4 or less, Unrest increases by 1; if you fail by 5 or more, Unrest increases by 1d4.

Step 2—Pay Consumption:
		Subtract your kingdom’s Consumption from the kingdom’s Treasury. If your Treasury is negative after paying Consumption, Unrest increases by 2.

Step 3—Fill Vacant Magic Item Slots: 
		If any of your settlement districts have buildings that produce magic items (such as a Caster’s Tower or Herbalist) with vacant magic item slots, 
	there is a chance of those slots filling with new items (see the Magic Items in Settlements section).

Step 4—Modify Unrest: 
		Unrest increases by 1 for each kingdom attribute (Economy, Loyalty, or Stability) that is a negative number.

		The Royal Enforcer may attempt to reduce Unrest during this step.

		If the kingdom’s Unrest is 11 or higher, it loses 1 hex (the leaders choose which hex). See Losing Hexes.

		If your kingdom’s Unrest ever reaches 20, the kingdom falls into anarchy. While in anarchy, your kingdom can take no action and treats all Economy, Loyalty, 
	and Stability check results as 0. Restoring order once a kingdom falls into anarchy typically requires a number of quests and lengthy adventures by you 
	and the other would-be leaders to restore the people’s faith in you.

Example: 
		Jessica is the Ruler of a kingdom with a Size of 30 and a Control DC of 60. Based on leadership role bonuses, kingdom alignment bonuses, and buildings in her settlements, 
	the kingdom’s Economy is 52, its Loyalty is 45, and its Stability is 56. Its Unrest is currently 5, its Consumption is 5, and the Treasury has 12 BP. In Step 1 of the Upkeep Phase,
	Adam, the Warden, attempts a Stability check to determine the kingdom’s stability. Adam rolls a 19, adds the kingdom’s Stability (56), and subtracts its Unrest (5), for a total of 70;
	that’s a success, so Unrest decreases by 1. In Step 2, the kingdom pays 5 BP for Consumption. None of the kingdom’s magic item slots are empty, so they skip Step 3. In Step 4, 
	none of the attributes are negative, so Unrest doesn’t increase. Mark, the Royal Enforcer, doesn’t want to risk reducing the kingdom’s Loyalty,
	so he doesn’t use his leadership role to reduce Unrest. At the end of this phase, the kingdom has Economy 52, Loyalty 45, Stability 56, Unrest 4, Consumption 5, and Treasury 7 BP.

*/
async function UpkeepPhase(step = 1){
	let kingdomData = (await GetKingdomData())[0];
	let d;
	switch(step){
		case 1:
			d = new Dialog({
				title: "Upkeep Phase: ",
				content: `
					<h3><b>Step 1—Determine Kingdom Stability:</b></h3>
					<p>
						&emsp;Attempt a <b>Stability check</b>. If you succeed, Unrest decreases by 1 (if this would reduce Unrest below 0, add 1 BP to your Treasury instead). If you fail by 4 or less, Unrest increases by 1; if you fail by 5 or more, Unrest increases by 1d4.
					</p>
				`,
				buttons: {
					skipPhase: {
						//icon: '<i class="fas fa-dice"></i>',
						label: "Skip Upkeep Phase",
						callback: () => {
							GoToPhaseStep("Edict",1);
						}
					},
					stabilityCheck: {
						icon: '<i class="fas fa-dice"></i>',
						label: "Stability check",
						callback: () => {
							Check('stability', 1);
							UpkeepPhase(step + 1);
						}
					}
				},
				default: "stabilityCheck",
				render: html => console.log("Register interactivity in the rendered dialog"),
				close: html => console.log("This always is logged no matter which option is chosen")
			});
			d.render(true);
		break;
		case 2:
			d = new Dialog({
				title: "Upkeep Phase: ",
				content: `
					<h3><b>Step 2—Pay Consumption:</b></h3>
					<p>
						&emsp;Subtract your kingdom’s Consumption <b>(${kingdomData["consumption"]})</b> from the kingdom’s Treasury. If your Treasury <b>(${kingdomData["treasury"]})</b> is negative after paying Consumption, Unrest increases by 2.
					</p>
				`,
				buttons: {
					next: {
						//icon: '<i class="fas fa-check"></i>',
						label: "Next step",
						callback: () => {
							UpkeepPhase(step + 1);
						}
					}
				},
				default: "next",
				render: html => console.log("Register interactivity in the rendered dialog"),
				close: html => console.log("This always is logged no matter which option is chosen")
			});
			d.render(true);
		break;
		case 3:
			d = new Dialog({
				title: "Upkeep Phase: ",
				content: `
					<h3><b>Step 3—Fill Vacant Magic Item Slots:</b></h3>
					<p>
						&emsp;If any of your settlement districts have buildings that produce magic items (such as a Caster’s Tower or Herbalist) with vacant magic item slots, there is a chance of those slots filling with new items (see the Magic Items in Settlements section).
					</p>
				`,
				buttons: {
					next: {
						//icon: '<i class="fas fa-check"></i>',
						label: "Next step",
						callback: () => {
							UpkeepPhase(step + 1);
						}
					}
				},
				default: "next",
				render: html => console.log("Register interactivity in the rendered dialog"),
				close: html => console.log("This always is logged no matter which option is chosen")
			});
			d.render(true);
		break;
		case 4:
			d = new Dialog({
				title: "Upkeep Phase: ",
				content: `
					<h3><b>Step 4—Modify Unrest:</b></h3>
					<p>
						&emsp;Unrest increases by 1 for each kingdom attribute (Economy<b>(${kingdomData["economy"]})</b>, Loyalty<b>(${kingdomData["loyalty"]})</b>, or Stability<b>(${kingdomData["stability"]})</b>) that is a negative number.
						<br><br>&emsp;
						The <b>Royal Enforcer</b> may attempt to reduce Unrest during this step.
						<br><br>&emsp;
						If the kingdom’s Unrest<b>(${kingdomData["unrest"]})</b> is 11 or higher, it loses 1 hex (the leaders choose which hex). See Losing Hexes.
						<br><br>&emsp;
						If your kingdom’s Unrest<b>(${kingdomData["unrest"]})</b> ever reaches 20, the kingdom falls into anarchy. While in anarchy, your kingdom can take no action and treats all Economy, Loyalty, and Stability check results as 0. Restoring order once a kingdom falls into anarchy typically requires a number of quests and lengthy adventures by you and the other would-be leaders to restore the people’s faith in you.
					</p>
				`,
				buttons: {
					loyaltyCheck: {
						icon: '<i class="fas fa-dice"></i>',
						label: "Reduce Unrest",
						callback: () => {
							Check("Loyalty",3);
							EdictPhase(1);
						}
					},
					next: {
						//icon: '<i class="fas fa-check"></i>',
						label: "Next Step",
						callback: () => {
							EdictPhase(1);
						}
					}
				},
				default: "next",
				render: html => console.log("Register interactivity in the rendered dialog"),
				close: html =>	 console.log("This always is logged no matter which option is chosen")
			});
			d.render(true);
		break;
	}
}

//*****************************************************************************************************************************************************
//Phase 2—Edict: Declare official proclamations about taxes, diplomacy, and other kingdom-wide decisions.
//*****************************************************************************************************************************************************
/*

The Edict phase is when you make proclamations on expansion, improvements, taxation, holidays, and so on.

Step 1—Assign Leadership: 
	Assign PCs or NPCs to any vacant leadership roles or change the roles being filled by particular PCs or closely allied NPCs (see Leadership Roles).

Step 2—Claim and Abandon Hexes: 
		For your kingdom to grow, you must claim additional hexes. You can only claim a hex that is adjacent to at least 1 other hex in your kingdom. Before you can claim it, 
	the hex must first be explored, then cleared of monsters and dangerous hazards (see Steps 2 and 3 of Founding a Settlement for more details). Then, to claim the hex, spend 1 BP; 
	this establishes the hex as part of your kingdom and increases your kingdom’s Size by 1. Table: Improvement Edicts tells you the maximum number of hexes you can claim per turn.

		You may abandon any number of hexes to reduce your kingdom’s Size (which you may wish to do to manage Consumption). Doing so increases Unrest by 1 for each hex abandoned 
	(or by 4 if the hex contained a settlement). This otherwise functions like losing a hex due to unrest (see Step 4 of the Upkeep Phase).

Step 4—Build Terrain Improvements: 
	You may spend BP to build terrain improvements like Farms, Forts, Roads, Mines, and Quarries (see Terrain Improvements).

		You may also prepare a hex for constructing a settlement. Depending on the site, this may involve clearing trees, moving boulders, digging sanitation trenches, and so on. 
	See the Preparation Cost column on Table: Terrain and Terrain Improvements to determine how many BP this requires.

Table: Improvement Edicts tells you the maximum number of terrain improvements you can make per turn.

Step 5—Create and Improve Settlements: 
	You may create a settlement in a claimed hex (see Founding a Settlement). Table: Improvement Edicts tells you the maximum number of settlements you can establish per turn.

		You may a building in any settlement in your kingdom. The list of available building types begins. When a building is completed, apply its modifiers to your kingdom sheet. 
	Table: Improvement Edicts tells you the maximum number of buildings you can construct in your kingdom per turn. The first House, Mansion, Noble Villa, or Tenement your kingdom 
	builds each turn does not count against that limit.

Step 6—Create Army Units: 
	You may create, expand, equip, or repair army units (see Mass Combat).

Step 7—Issue Edicts: 
	Select or adjust your edict levels (see Edicts).

Example: 
		Jessica’s kingdom has no vacant leadership roles, so nothing happens in Step 1. The leaders don’t want to spend BP and increase Size right now, so in Step 2 they don’t claim any hexes. 
	In Step 3, the leaders construct a Farm in one of the kingdom’s prepared hexes (Consumption –2, Treasury –2 BP). In Steps 5 and 6, the leaders continue to be frugal and do not construct 
	settlement improvements or create armies. In Step 7, the leaders issue a Holiday edict of one national holiday (Loyalty +1, Consumption +1) and set the Promotion edict level to “none” 
	(Stability –1, Consumption +0). Looking ahead to the Income Phase, Jessica realizes that an average roll for her Economy check would be a failure (10 on the 1d20 + 52 Economy – 4 Unrest = 58, 
	less than the Control DC of 60), which means there’s a good chance the kingdom won’t generate any BP this turn. She decides to set the Taxation edict to “heavy” (Economy +3, Loyalty –4). 
	At the end of this phase, the kingdom has Economy 55, Loyalty 42, Stability 55, Unrest 4, Consumption 4, and Treasury 5 BP.

*/

async function EdictPhase(step = 1){
	let kingdomData = (await GetKingdomData())[0];
	let d;
	switch(step){
		case 1:
			let emptyList = "<h4>Vacancies:</h4><ul>"
			for(let item of await GetVacantPositions()){
				emptyList += `<li>${item}</li>`;
			}
			
			emptyList += "</ul>";
			d = new Dialog({
				title: "Edict Phase: ",
				content: `
					<h3><b>Step 1—Assign Leadership:</b></h3>
					<p>
						&emsp;Assign PCs or NPCs to any vacant leadership roles or change the roles being filled by particular PCs or closely allied NPCs (see Leadership Roles).
					</p>
					${emptyList}
				`,
				buttons: {
					next: {
						//icon: '<i class="fas fa-check"></i>',
						label: "Next step",
						callback: () => {
							EdictPhase(step + 1);
						}
					}
				},
				default: "next",
				render: html => console.log("Register interactivity in the rendered dialog"),
				close: html => console.log("This always is logged no matter which option is chosen")
			});
			d.render(true);
		break;
		case 2:
			d = new Dialog({
				title: "Edict Phase: ",
				content: `
					<h3><b>Step 2—Claim and Abandon Hexes:</b></h3>
					<p>
						&emsp;For your kingdom to grow, you must claim additional hexes. You can only claim a hex that is adjacent to at least 1 other hex in your kingdom. Before you can claim it, the hex must first be explored, then cleared of monsters and dangerous hazards (see Steps 2 and 3 of Founding a Settlement for more details). Then, to claim the hex, spend 1 BP; this establishes the hex as part of your kingdom and increases your kingdom’s Size by 1. Table: Improvement Edicts tells you the maximum number of hexes you can claim per turn.
						<br>&emsp;You may abandon any number of hexes to reduce your kingdom’s Size (which you may wish to do to manage Consumption). Doing so increases Unrest by 1 for each hex abandoned (or by 4 if the hex contained a settlement). This otherwise functions like losing a hex due to unrest (see Step 4 of the Upkeep Phase).
					</p>
				`,
				buttons: {
					next: {
						//icon: '<i class="fas fa-check"></i>',
						label: "Next step",
						callback: () => {
							EdictPhase(step + 1);
						}
					}
				},
				default: "next",
				render: html => console.log("Register interactivity in the rendered dialog"),
				close: html => console.log("This always is logged no matter which option is chosen")
			});
			d.render(true);
		break;
		case 3:
			EdictPhase(step + 1);
		break;
		case 4:
			var pack = game.packs.get("pf-content.kingdom-building-gm");
			journal = pack.index.filter(template => template.name.indexOf("3.2.1.1 ") > -1)[0];
			journal2 = pack.index.filter(template => template.name.indexOf("3.2.1 ") > -1)[0];
			comp = "@Compendium[pf-content.kingdom-building-gm." + journal2._id + "]{" + journal2.name + "}<br>" + "@Compendium[pf-content.kingdom-building-gm." + journal._id + "]{" + journal.name + "}";
			d = new Dialog({
				title: "Edict Phase: ",
				
				//
				content: `
					<h3><b>Step 4—Build Terrain Improvements:</b></h3>
					<p>
						&emsp;You may spend BP to build terrain improvements like Farms, Forts, Roads, Mines, and Quarries (see <b><a onclick="ToChatMessage('${comp}')">Terrain Improvements</a></b>).
						<br><br>&emsp;
						You may also prepare a hex for constructing a settlement. Depending on the site, this may involve clearing trees, moving boulders, digging sanitation trenches, and so on. See the Preparation Cost column on Table: Terrain and Terrain Improvements to determine how many BP this requires.
					</p>
				`,
				buttons: {
					next: {
						//icon: '<i class="fas fa-check"></i>',
						label: "Next Step",
						callback: () => {
							EdictPhase(step + 1);
						}
					}
				},
				default: "next",
				render: html => console.log("Register interactivity in the rendered dialog"),
				close: html =>	 console.log("This always is logged no matter which option is chosen")
			});
			d.render(true);
		break;
		case 5:
			d = new Dialog({
				title: "Edict Phase: ",
				content: `
					<h3><b>Step 5—Create and Improve Settlements:</b></h3>
					<p>
						&emsp;You may create a settlement in a claimed hex (see Founding a Settlement). Table: Improvement Edicts tells you the maximum number of settlements you can establish per turn.
						<br><br>&emsp;
						You may a building in any settlement in your kingdom. The list of available building types begins. When a building is completed, apply its modifiers to your kingdom sheet. Table: Improvement Edicts tells you the maximum number of buildings you can construct in your kingdom per turn. The first House, Mansion, Noble Villa, or Tenement your kingdom builds each turn does not count against that limit.
					</p>
				`,
				buttons: {
					openSheet:{
						label: "Open Sheet",
						callback: () => {
							window.open("https://docs.google.com/spreadsheets/d/1RoH8ZctBpbmHdqYC8h-BOxjJd9ZXXNbDiMci8DoNTTA/edit#gid=0", "_blank");
							EdictPhase(step);
						}
					},
					next: {
						//icon: '<i class="fas fa-check"></i>',
						label: "Next Step",
						callback: () => {
							EdictPhase(step + 1);
						}
					}
				},
				default: "next",
				render: html => console.log("Register interactivity in the rendered dialog"),
				close: html =>	 console.log("This always is logged no matter which option is chosen")
			});
			d.render(true);
		break;
		case 6:
			d = new Dialog({
				title: "Edict Phase: ",
				content: `
					<h3><b>Step 6—Create Army Units:</b></h3>
					<p>
						&emsp;You may create, expand, equip, or repair army units (see Mass Combat).
					</p>
				`,
				buttons: {
					next: {
						//icon: '<i class="fas fa-check"></i>',
						label: "Next Step",
						callback: () => {
							EdictPhase(step + 1);
						}
					}
				},
				default: "next",
				render: html => console.log("Register interactivity in the rendered dialog"),
				close: html =>	 console.log("This always is logged no matter which option is chosen")
			});
			d.render(true);
		break;
		case 7:
			d = new Dialog({
				title: "Edict Phase: ",
				content: `
					<h3><b>Step 7—Issue Edicts:</b></h3>
					<p>
						&emsp;Select or adjust your edict levels (see Edicts).
					</p>
				`,
				buttons: {
					next: {
						//icon: '<i class="fas fa-check"></i>',
						label: "Next Step",
						callback: () => {
							IncomePhase(1);
						}
					}
				},
				default: "next",
				render: html => console.log("Register interactivity in the rendered dialog"),
				close: html =>	 console.log("This always is logged no matter which option is chosen")
			});
			d.render(true);
		break;
	}
}



//*****************************************************************************************************************************************************
//Phase 3—Income: Add to your Treasury by collecting taxes and converting gp into BP, or withdraw BP from your kingdom for your personal use.
//*****************************************************************************************************************************************************
/*

During the Income phase, you may add to or withdraw from the Treasury as well as collect taxes.

Step 1—Make Withdrawals from the Treasury: 
		The kingdom-building rules allow you to expend BP on things related to running the kingdom. If you want to spend some of the kingdom’s resources on 
	something for your own personal benefit (such as a new magic item), you may withdraw BP from the Treasury and convert it into gp once per turn, but there is a penalty for doing so.

	Each time you withdraw BP for your personal use, Unrest increases by the number of BP withdrawn. Each BP you withdraw this way converts to 2,000 gp of personal funds.

Step 2—Make Deposits to the Treasury: 
		You can add funds to a kingdom’s Treasury by donating your personal wealth to the kingdom—coins, gems, jewelry, weapons, armor, magic items, and other valuables you find while 
	adventuring, as long as they are individually worth 4,000 gp or less. For every full 4,000 gp in value of the deposit, increase your kingdom’s BP by 1.

If you want to donate an item that is worth more than 4,000 gp, refer to Step 3 instead.

Step 3—Sell Expensive Items for BP: 
		You can attempt to sell expensive personal items (that is, items worth more than 4,000 gp each) through your kingdom’s markets to add to your Treasury. You may sell one item per 
	settlement district per turn. You must choose the settlement where you want to sell the item, and the item cannot be worth more than the base value of that settlement.

	To sell an item, divide its price by half (as if selling it to an NPC for gp), divide the result by 4,000 (rounded down), and add that many BP to your Treasury.

		You cannot use this step to sell magic items held or created by buildings in your settlements; those items are the property of the owners of those businesses. (See Magic Items in 
	Settlements for more information on this topic.)

Step 4—Collect Taxes: 
	Attempt an Economy check, divide the result by 3 (round down), and add a number of BP to your Treasury equal to the result.

Example: 
		Jessica and the other leaders need to keep BP in the kingdom for future plans, so they skip Step 1 of the Income phase. They are worried that they won’t collect enough taxes 
	this turn, so just in case, in Step 2 they deposit 8,000 gp worth of coins, gems, and small magic items (Treasury +2 BP). The leaders aren’t selling any expensive items, so nothing 
	happens in Step 3. In Step 4, Rob, the Treasurer, rolls the Economy check to collect taxes. Rob rolls a 9 on the 1d20, adds the kingdom’s Economy score (55), and subtracts Unrest (4) 
	for a total of 60, which means the kingdom adds 20 BP (the Economy check result of 60, divided by 3) to the Treasury. At the end of this phase, the kingdom has Economy 55, Loyalty 42, 
	Stability 55, Unrest 4, Consumption 4, and Treasury 27 BP.

*/

let GP_BP_Conversion = {
	25: {
		price: 1000,
		withdraw: 500
	},
	50: {
		price: 2000,
		withdraw: 1000
	},
	100: {
		price: 3000,
		withdraw: 1500
	},
	101: {
		price: 4000,
		withdraw: 2000
	},
	GetPrice: (size) => {
		if(size <= 25){
			return GP_BP_Conversion["25"].price;
		}else if(size <= 50){
			return GP_BP_Conversion["50"].price;
		}else if(size <= 100){
			return GP_BP_Conversion["100"].price;
		}else if(size > 100){
			return GP_BP_Conversion["101"].price;
		}
	},
	GetWithdrawalRate: (size) => {
		if(size <= 25){
			return GP_BP_Conversion["25"].withdraw;
		}else if(size <= 50){
			return GP_BP_Conversion["50"].withdraw;
		}else if(size <= 100){
			return GP_BP_Conversion["100"].withdraw;
		}else if(size > 100){
			return GP_BP_Conversion["101"].withdraw;
		}
	}
}


async function IncomePhase(step = 1){
	let kingdomData = (await GetKingdomData())[0];
	let d;
	let BP_Price = GP_BP_Conversion.GetPrice(kingdomData["size"]);
	let withdrawRate = GP_BP_Conversion.GetWithdrawalRate(kingdomData["size"]);
	switch(step){
		case 1:
			d = new Dialog({
				title: "Income Phase: ",
				content: `
					<h3><b>Step 1—Make Withdrawals from the Treasury:</b></h3>
					<p>
						&emsp;The kingdom-building rules allow you to expend BP on things related to running the kingdom. If you want to spend some of the kingdom’s resources on something for your own personal benefit (such as a new magic item), you may withdraw BP from the Treasury and convert it into gp once per turn, but there is a penalty for doing so.
						<br><br>&emsp;
						Each time you withdraw BP for your personal use, Unrest increases by the number of BP withdrawn. Each BP you withdraw this way converts to ${withdrawRate} gp of personal funds.
					</p>
				`,
				buttons: {
					next: {
						//icon: '<i class="fas fa-check"></i>',
						label: "Next step",
						callback: () => {
							IncomePhase(step + 1);
						}
					}
				},
				default: "next",
				render: html => console.log("Register interactivity in the rendered dialog"),
				close: html => console.log("This always is logged no matter which option is chosen")
			});
			d.render(true);
		break;
		case 2:
			d = new Dialog({
				title: "Income Phase: ",
				content: `
					<h3><b>Step 2—Make Deposits to the Treasury:</b></h3>
					<p>
						&emsp;You can add funds to a kingdom’s Treasury by donating your personal wealth to the kingdom—coins, gems, jewelry, weapons, armor, magic items, and other valuables you find while adventuring, as long as they are individually worth ${BP_Price} gp or less. For every full ${BP_Price} gp in value of the deposit, increase your kingdom’s BP by 1.
						<br><br>&emsp;
						If you want to donate an item that is worth more than ${BP_Price} gp, refer to Step 3 instead.
					</p>
				`,
				buttons: {
					next: {
						//icon: '<i class="fas fa-check"></i>',
						label: "Next step",
						callback: () => {
							IncomePhase(step + 1);
						}
					}
				},
				default: "next",
				render: html => console.log("Register interactivity in the rendered dialog"),
				close: html => console.log("This always is logged no matter which option is chosen")
			});
			d.render(true);
		break;
		case 3:
			var pack = game.packs.get("pf-content.kingdom-building-gm");
			journal = pack.index.filter(template => template.name.indexOf("3.2.1.1 ") > -1)[0];
			journal2 = pack.index.filter(template => template.name.indexOf("3.2.1 ") > -1)[0];
			comp = "@Compendium[pf-content.kingdom-building-gm." + journal2._id + "]{" + journal2.name + "}<br>" + "@Compendium[pf-content.kingdom-building-gm." + journal._id + "]{" + journal.name + "}";
			d = new Dialog({
				title: "Income Phase: ",
				
				//
				content: `
					<h3><b>Step 3—Sell Expensive Items for BP:</b></h3>
					<p>
						&emsp;You can attempt to sell expensive personal items (that is, items worth more than ${BP_Price} gp each) through your kingdom’s markets to add to your Treasury. You may sell one item per settlement district per turn. You must choose the settlement where you want to sell the item, and the item cannot be worth more than the base value of that settlement.
						<br><br>&emsp;
						To sell an item, divide its price by half (as if selling it to an NPC for gp), divide the result by ${BP_Price} (rounded down), and add that many BP to your Treasury.
						<br><br>&emsp;
						You cannot use this step to sell magic items held or created by buildings in your settlements; those items are the property of the owners of those businesses. (See Magic Items in Settlements for more information on this topic.)
						
					</p>
				`,
				buttons: {
					next: {
						//icon: '<i class="fas fa-check"></i>',
						label: "Next Step",
						callback: () => {
							IncomePhase(step + 1);
						}
					}
				},
				default: "next",
				render: html => console.log("Register interactivity in the rendered dialog"),
				close: html =>	 console.log("This always is logged no matter which option is chosen")
			});
			d.render(true);
		break;
		case 4:
			var pack = game.packs.get("pf-content.kingdom-building-gm");
			journal = pack.index.filter(template => template.name.indexOf("3.2.1.1 ") > -1)[0];
			journal2 = pack.index.filter(template => template.name.indexOf("3.2.1 ") > -1)[0];
			comp = "@Compendium[pf-content.kingdom-building-gm." + journal2._id + "]{" + journal2.name + "}<br>" + "@Compendium[pf-content.kingdom-building-gm." + journal._id + "]{" + journal.name + "}";
			d = new Dialog({
				title: "Income Phase: ",
				
				//
				content: `
					<h3><b>Step 4—Collect Taxes:</b></h3>
					<p>
						&emsp;Attempt an Economy check, divide the result by 3 (round down), and add a number of BP to your Treasury equal to the result.
					</p>
				`,
				buttons: {
					economyCheck: {
						icon: '<i class="fas fa-dice"></i>',
						label: "Economy Check",
						callback: () => {
							Check("economy");
							//IncomePhase(step + 1);
						}
					},
					next: {
						//icon: '<i class="fas fa-check"></i>',
						label: "Next Step",
						callback: () => {
							//IncomePhase(step + 1);
							EventPhase(1);
						}
					}
				},
				default: "next",
				render: html => console.log("Register interactivity in the rendered dialog"),
				close: html =>	 console.log("This always is logged no matter which option is chosen")
			});
			d.render(true);
		break;
	}
}
//*****************************************************************************************************************************************************
//Phase 4—Event: 
//*****************************************************************************************************************************************************
/*
		Check whether any unusual events occur that require attention. Some are beneficial, such as an economic boom, good weather, or the discovery of remarkable treasure. 
	Others are detrimental, such as foul weather, a plague, or a rampaging monster.
	
	In the Event phase, a random event may affect your kingdom as a whole or a single settlement or hex.

		There is a 25% chance of an event occurring (see Events). If no event occurred during the last turn, this chance increases to 75%. Some events can be negated, ended, or 
	compensated for with some kind of kingdom check. Others, such as a rampaging monster, require you to complete an adventure or deal with a problem in a way not covered by the 
	kingdom-building rules.

	In addition, the GM may have an adventure- or campaign-specific event take place. Other events may also happen during this phase, such as independence or unification.

Example: 
		The GM rolls on one of the event tables and determines that a monster is attacking one of the kingdom’s hexes. Instead of attempting a Stability check to deal with the monster 
	(risking increasing Unrest if it fails), Jessica and the other leaders go on a quest to deal with the monster personally. They defeat the monster, so the event does not generate 
	any Unrest. At the end of this phase, the kingdom’s scores are unchanged: Economy 55, Loyalty 42, Stability 55, Unrest 4, Consumption 4, and Treasury 27 BP.

*/

function EventPhase(){
	d = new Dialog({
		title: "Event Phase: ",
		content: `
			<h3><b>Did an Event occur last round?</b></h3>
			<p>
				&emsp;Check whether any unusual events occur that require attention. Some are beneficial, such as an economic boom, good weather, or the discovery of remarkable treasure. Others are detrimental, such as foul weather, a plague, or a rampaging monster.
				<br><br>&emsp;
				In the Event phase, a random event may affect your kingdom as a whole or a single settlement or hex.
				<br><br>&emsp;
				There is a 25% chance of an event occurring (see Events). If no event occurred during the last turn, this chance increases to 75%. Some events can be negated, ended, or compensated for with some kind of kingdom check. Others, such as a rampaging monster, require you to complete an adventure or deal with a problem in a way not covered by the kingdom-building rules.
				<br><br>&emsp;
				In addition, the GM may have an adventure- or campaign-specific event take place. Other events may also happen during this phase, such as independence or unification.
			</p>
		`,
		buttons: {
			yes:{
				label: "Yes",
				callback: () => {
					let r = new Roll(`1d100`);
					r.evaluate().then(r => {
						let RollTemplate = `<div class="message-content">
											<h2>Event Check</h2>
											<div class="dice-roll">
												<div class="dice-result">
													<div class="dice-formula">${r.result}</div>
													<div class="dice-tooltip" style="display: none;">
														<section class="tooltip-part">
															<div class="dice">
																<header class="part-header flexrow">
																	<span class="part-formula">${r.terms[0].formula}</span>

																	<span class="part-total">${r.terms[0].total}</span>
																</header>
																<ol class="dice-rolls">
																	<li class="roll die d20">${r.terms[0].total}</li>
																</ol>
															</div>
														</section>
													</div>

													<h4 class="dice-total">${r.total}</h4>
												</div>
											</div>

										</div>`;
						if(r.total <= 25){
							RollTemplate += `<p>@Compendium[pf-content.kingdom-building-tables.auJYpJlk9F8khLvm]{KB: Event Type and Danger Level}</p>`;
						}
						let chatData = {
							user: game.user.id,
							content: RollTemplate,
							whisper : ChatMessage.getWhisperRecipients("Gamemaster")
						};
						ChatMessage.create(chatData, {});
					});
				}
			},
			no: {
				label: "No",
				callback: () => {
					let r = new Roll(`1d100`);
					r.evaluate().then(r => {
						let RollTemplate = `<div class="message-content">
											<h2>Event Check</h2>
											<div class="dice-roll">
												<div class="dice-result">
													<div class="dice-formula">${r.result}</div>
													<div class="dice-tooltip" style="display: none;">
														<section class="tooltip-part">
															<div class="dice">
																<header class="part-header flexrow">
																	<span class="part-formula">${r.terms[0].formula}</span>

																	<span class="part-total">${r.terms[0].total}</span>
																</header>
																<ol class="dice-rolls">
																	<li class="roll die d20">${r.terms[0].total}</li>
																</ol>
															</div>
														</section>
													</div>

													<h4 class="dice-total">${r.total}</h4>
												</div>
											</div>

										</div>`;
						if(r.total <= 75){
							RollTemplate += `<p>@Compendium[pf-content.kingdom-building-tables.auJYpJlk9F8khLvm]{KB: Event Type and Danger Level}</p>`;
						}
						let chatData = {
							user: game.user.id,
							content: RollTemplate,
							whisper : ChatMessage.getWhisperRecipients("Gamemaster")
						};
						ChatMessage.create(chatData, {});
					});
				}
			}
		},
		default: "next",
		render: html => console.log("Register interactivity in the rendered dialog"),
		close: html => console.log("This always is logged no matter which option is chosen")
	});
	d.render(true);
}

//These phases are always undertaken in the above order. Many steps allow you to perform an action once per kingdom turn; this means once for the entire kingdom, not once per leader.



let json;
let EconomyResult;
let roll;
Hooks.on("ready", ()=> {
	
	//economy check
	
	//Check("ECONOMY");
});

let CheckSubtypes = {
	Loyalty: {
		Abdication: 1,
		StandInRuler: 2,
		ReduceUnrest: 3
	},
	Stability: {
		Upkeep: 1,
		Event: 2
	}
};

async function GetKingdomData(){
	let sheetName = "JSON";
	const url = "https://opensheet.elk.sh/" + sheetId + "/" + sheetName;
	let response = await fetch(url).then(res => res.text()).then(data => { return JSON.parse(data)});
	return response;
}

function Check(type, subType = 0){
	let sheetName = "JSON";
	
	type = type.toLowerCase();
	const url = "https://opensheet.elk.sh/" + sheetId + "/" + sheetName;
	fetch(url)
		.then(res => res.text())
		.then(data => {
			console.log(data);
			json = JSON.parse(data);
			let r = new Roll(`1d20 + @${type}`, json[0]);
			r.evaluate().then(r => {
				let RollTemplate = `<div class="message-content">
										<h2>${ProperCase(type)} Check (DC: ${json[0]["control dc"]})</h2>
										<div class="dice-roll">
											<div class="dice-result">
												<div class="dice-formula">${r.result}</div>
												<div class="dice-tooltip" style="display: none;">
													<section class="tooltip-part">
														<div class="dice">
															<header class="part-header flexrow">
																<span class="part-formula">${r.terms[0].formula}</span>

																<span class="part-total">${r.terms[0].total}</span>
															</header>
															<ol class="dice-rolls">
																<li class="roll die d20">${r.terms[0].total}</li>
															</ol>
														</div>
													</section>
												</div>

												<h4 class="dice-total">${r.total}</h4>
											</div>
										</div>

									</div>`;
				switch(type){
					case "stability":
						switch(subType){
							case 1:
								if((r.total >= json[0]["control dc"] && r.terms[0].total != 1) || r.terms[0].total == 20){
									if(json[0]["unrest"] == 0){
										RollTemplate += `<div class="dice-roll">
															<div class="dice-result">
																<h4 class="dice-total">+1 BP</h4>
															</div>
														</div>`;
									}else{
										RollTemplate += `<div class="dice-roll">
															<div class="dice-result">
																<h4 class="dice-total">-1 Unrest</h4>
															</div>
														</div>`;
									}
								}else if(r.total >= json[0]["control dc"] - 4){
									RollTemplate += `<div class="dice-roll">
															<div class="dice-result">
																<h4 class="dice-total">+1 Unrest</h4>
															</div>
														</div>`;
								}else{
									RollTemplate += `<div class="dice-roll">
															<div class="dice-result">
																<h4 class="dice-total">+[[/r 1d4]] Unrest</h4>
															</div>
														</div>`;
								}
								
							break;
							case 5:
								RollTemplate += `<div class="dice-roll">
													<div class="dice-result">
														<h4 class="dice-total">Check Event</h4>
													</div>
												</div>`;
							break;
						}
					break;
					case "economy":
						EconomyResult = r.total;
						roll = r;
						let BPGained = (r.total >= json[0]["control dc"]) ? (r.terms[0].total == 1 ? 0 : Math.floor(r.total / 3)): (r.terms[0].total == 20 ? Math.floor(r.total / 3) : 0);
						RollTemplate += `<div class="dice-roll">
											<div class="dice-result">
												<h4 class="dice-total">${BPGained} BP Gained</h4>
											</div>
										</div>`;
					break;
					case "loyalty":
						switch(subType){
							case 1:
							
							break;
							case 2:
							
							break;
							case 3:
								if((r.total >= json[0]["control dc"] && r.terms[0].total != 1) || r.terms[0].total == 20){
									RollTemplate += `<div class="dice-roll">
														<div class="dice-result">
															<h4 class="dice-total">-1 Unrest</h4>
														</div>
													</div>`;
								}else{
									RollTemplate += `<div class="dice-roll">
														<div class="dice-result">
															<h4 class="dice-total">-1 Loyalty</h4>
														</div>
													</div>`;
								}
							break;
						}
					break;
				}
				let chatData = {
					user: game.user.id,
					content: RollTemplate
				};
				ChatMessage.create(chatData, {});
			});
		});
		
		
	
}

function ProperCase(string){
	let ret = "";
	for(let str of string.split(" ")){
		ret += str[0].toUpperCase() + str.substring(1) + " ";
	}
	ret = ret.substring(0,ret.length - 1);
	ret = ret.indexOf("Dc") > -1 ? ret.replace("Dc","DC") : ret ;
	return ret;
}

function ToChatMessage(content){
	let chatData = {
	   user: game.user.id,
	   speaker: {
		  alias: "Kingdom Building"
	   },
	   content: content
	};
	ChatMessage.create(chatData, {});
}

/*

// Module's entry point
Hooks.on("ready", async () => {
  //Register the loot sheet
  Actors.registerSheet("PF1", LootSheetConstants.LootSheetPf1NPC, {
    types: ["npc"],
    makeDefault: false
  });
});

*/
