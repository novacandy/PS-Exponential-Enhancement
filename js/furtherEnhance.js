let dialogueStep = 0
let dialogueLine = 0
let dialogueID = "blank"
let tabLastTick = "Erin"
let idLastTick = "blank"

const furtherDialogue = {
    blank: {
        dialogue: [
            {erinText: () => {return ""}, erinPortrait: "erinNormal"},
        ],
        trigger() {return true}
    },
    introduction: {
        dialogue: [
            {erinText: () => {return "...Hey there."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "I'm Erin. By now you probably know what I'm here for."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "..."}, erinPortrait: "erinTired"},
            {erinText: () => {return "You didn't... hate the balancing of the last seven layers, did you?"}, erinPortrait: "erinShy"},
            {erinText: () => {return "I mean, exponentially growing numbers are fun to watch, but it does get boring after a while, doesn't it?"}, erinPortrait: "erinNormal"},
            {erinText: () => {return "Sorry, I need to stay on course otherwise Boss will get mad at me again..."}, erinPortrait: "erinTired"},
            {erinText: () => {return "Welcome to Further Enhancement, the last layer of my sapling."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "The 24 intensifier milestone you earned earlier has tetrated your point gain by 2, making you passively generate OoM^OoMs of points per second."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "Further Enhancement is designed to make your OoM^OoMs/s faster using Further Enhance Points, which also tetrate your point gain."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "Once we're done talking, I'll start generating further enhance points for you. Sound good?"}, erinPortrait: "erinNormal"},
            {erinText: () => {return "Oh, wait... I forgot to ask your name, sorry. What is it?"}, erinPortrait: "erinShy", command: "Enter name."},
            {erinText: () => {return player.name + '... got it. Anyways, you should be generating further enhance points now.'}, erinPortrait: "erinNormal"},
            {erinText: () => {return "I've also unlocked a new feature for you: Mergeable Enhancers."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "Ever played one of those games where you merge two different things to make them much better?"}, erinPortrait: "erinNormal"},
            {erinText: () => {return "It's basically that, with enhancers. You should see a grid on that tab with Mergeable Enhancers spawning occasionally."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "To merge two Mergeable Enhancers together, click on a mergeable enhancer to highlight it, then click on another mergeable enhancer of the same tier to merge them together and increase its tier."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "Come back once you've earned 1 billion further enhance points."}, erinPortrait: "erinTired", command: "Reach 1.00e9 further enhance points."},
            // {erinText: () => {return ""}, erinPortrait: ""},
        ],
        trigger() {return player.tab == "f"}
    },
    replicanti: {
        dialogue: [
            {erinText: () => {return "Hello again, " + player.name + "."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "Ready for the next feature?"}, erinPortrait: "erinNormal"},
            {erinText: () => {return "This one also deals with exponential growth."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "Ever heard of this thing called Replicanti? My friend Mimi is obsessed with this stuff."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "They're these little blobs that slowly but surely replicate endlessly until they eventually condense into a galaxy."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "Personally, I think they're a little weird, I don't really like the idea that there could be a huge mass of replicanti out there that could potentially consume me and my entire galaxy..."}, erinPortrait: "erinShy"},
            {erinText: () => {return "...Let's just move on."}, erinPortrait: "erinTired"},
            {erinText: () => {return "You should've unlocked a new tab for Enhanced Replicanti right next to Mergeable Enhancers."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "Enhanced Replicanti multiplies your further enhance point gain, allowing you to reach higher tiers of mergable enhancers quicker."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "It'll start replicating very slowly, with only a 10% chance of replicating every second, but you can upgrade its replication chance and speed using further enhance points."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "Once you reach enough Enhanced Replicanti, you'll be able to condense it all into an Enhanced Galaxy, which grants a free level of <b>Better Mergeable Enhancers</b> each."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "I'll be waiting here until you reach 1.00e33 further enhance points. Good luck..."}, erinPortrait: "erinTired", command: "Reach 1.00e33 further enhance points."},
        ],
        trigger() {return player.f.best.gte(1e9)}
    },
    energy: {
        dialogue: [
            {erinText: () => {return "You ready? Let's continue."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "The next feature we'll be working with is Enhance Energy."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "It's a little bit complicated, so bear with me here."}, erinPortrait: "erinTired"},
            {erinText: () => {return "You'll start generating 1 base Enhance Energy per second, just like standard passively generated currencies you've dealt with before."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "Here's where the exponential part comes in: as you generate base Enhance Energy, it is raised to an exponent displayed right next to it."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "For example, if your Enhance Energy exponent is 1.00, you'll have just 10 Enhance Energy after 10 seconds."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "However, if you increase it to 3.00 using upgrades, you'll have 1000 Enhance Energy after 10 seconds, which is 10^3."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "I apologize if that didn't make sense, " + player.name + ", I'm trying my best..."}, erinPortrait: "erinShy"},
            {erinText: () => {return "Hopefully you'll understand it as you upgrade it more."}, erinPortrait: "erinTired"},
            {erinText: () => {return "Oh right, another thing. You should be automatically merging Mergeable Enhancers every tick now that you've reached 1.00e33 further enhance points."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "Don't worry, there's no downsides to it. There's isn't really a need to disable the automerger, just focus on increasing your Enhanced Energy amount and getting more further enhance points."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "You should be able to reach 1.00e100 further enhance points using the boosts you'll unlock with Enhance Energy. See you then."}, erinPortrait: "erinNormal", command: "Reach 1.00e100 further enhance points."},
        ],
        trigger() {return player.f.best.gte(1e33)}
    },
    furthererEnhance: {
        dialogue: [
            {erinText: () => {return "Almost there, " + player.name + ". Let's keep going."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "Let's switch things up with a new prestige layer."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "You should've unlocked a new tab, titled Furthest Enhance."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "And the new prestige layer you've unlocked is called..."}, erinPortrait: "erinNormal"},
            {erinText: () => {return "(sigh) ...Further<i>er</i> Enhance. I know, it sounds extremely stupid, I should've chosen a different name, but..."}, erinPortrait: "erinShy"},
            {erinText: () => {return "Can we just move on please? I'm so sorry..."}, erinPortrait: "erinShy"},
            {erinText: () => {return "Um... well... Furtherer Enhance isn't that big of a reset as it may seem, it does reset everything in Further Enhance up to this point, but you keep your automerge and everything remains unlocked, so this should be a quick recovery."}, erinPortrait: "erinTired"},
            {erinText: () => {return "Also, furtherer enhance points work just like how regular enhance points worked all the way back at the beginning of this sapling, giving an exponentially increasing multiplier to further enhance point gain."}, erinPortrait: "erinTired"},
            {erinText: () => {return "Yeah, um, once again, I apologize for the terribly named reset name, just purchase all the upgrades there for me and try to ignore how stupid the reset layer's name is..."}, erinPortrait: "erinShy", command: "Purchase all the Furtherer Enhance upgrades."},
        ],
        trigger() {return player.f.best.gte(1e100)}
    },
    furthestEnhance: {
        dialogue: [
            {erinText: () => {return "..."}, erinPortrait: "erinShy"},
            {erinText: () => {return "Please tell me you don't hate me..."}, erinPortrait: "erinShy"},
            {erinText: () => {return "I..."}, erinPortrait: "erinShy"},
            {erinText: () => {return "...Can I talk to you for a bit, " + player.name + "?"}, erinPortrait: "erinShy"},
            {erinText: () => {return "..."}, erinPortrait: "erinTired"},
            {erinText: () => {return player.name + ", you're the first player I'm guiding through this sapling."}, erinPortrait: "erinShy"},
            {erinText: () => {return "You've played through Mimi and Lori's saplings already, right? They have experience. I don't."}, erinPortrait: "erinShy"},
            {erinText: () => {return "I finished this sapling mere hours before you started playing."}, erinPortrait: "erinShy"},
            {erinText: () => {return "I was panicking to get this done quickly, there wasn't a due date on this or anything, but..."}, erinPortrait: "erinShy"},
            {erinText: () => {return "...I didn't want to disappoint Boss."}, erinPortrait: "erinShy"},
            {erinText: () => {return "She's just so... demanding. I barely even knew how to make incremental games when I became a Sapling Guardian, and she already expected me to already have the first layer of my sapling done."}, erinPortrait: "erinShy"},
            {erinText: () => {return "I... "}, erinPortrait: "erinShy"},
            {erinText: () => {return "I hate it here. I really, really hate it here..."}, erinPortrait: "erinCrying"},
            {erinText: () => {return "I don't understand how Mimi and Lori keep their cool doing this job."}, erinPortrait: "erinCrying"},
            {erinText: () => {return "So many expectations, so many demands... how do they see this as normal?"}, erinPortrait: "erinCrying"},
            {erinText: () => {return "They enjoy doing this so much. I don't."}, erinPortrait: "erinCrying"},
            {erinText: () => {return "I don't know what to do, I've been given so many privileges but so many responsibilities..."}, erinPortrait: "erinCrying"},
            {erinText: () => {return "It's too much... Why me... I..."}, erinPortrait: "erinCrying"},
            {erinText: () => {return "..."}, erinPortrait: "erinCrying"},
            {erinText: () => {return "I don't know if I can keep doing this anymore."}, erinPortrait: "erinCrying"},
            {erinText: () => {return "Furthest Enhance Points multiply its own amount every second and directly multiplies your furtherer enhance point gain."}, erinPortrait: "erinCrying"},
            {erinText: () => {return "You've also unlocked the Exponential Enhancer, which grants an exponent to further and furthest enhance point gain based on its amount."}, erinPortrait: "erinCrying"},
            {erinText: () => {return "This should be enough to reach endgame. I want to get this over with already. Goodbye, " + player.name + "."}, erinPortrait: "erinCrying", command: "Reach F1.00e100 points."},
        ],
        trigger() {return player.f.upgrades.includes(45)}
    },
    endgame: {
        dialogue: [
            {erinText: () => {return "Why are you still here? Go away..."}, erinPortrait: "erinCrying", command: "..."},
        ],
        trigger() {return isEndgame()}
    }
}

function renderDialogue(step) {
    if (furtherDialogue[dialogueID].dialogue[dialogueLine] == undefined) return ""
    let ret = ""
    for (let i = 0; i < furtherDialogue[dialogueID].dialogue[dialogueLine].erinText().length && i < step; i++) {
        ret = ret + furtherDialogue[dialogueID].dialogue[dialogueLine].erinText()[i]
    }
    return ret
}

function skipIntensify() {
    player.e.unlocked = true
    player.i.unlocked = true
    player.b.unlocked = true
    player.a.unlocked = true
    player.r.unlocked = true
    player.sb.unlocked = true
    player.n.unlocked = true
    player.f.unlocked = true
    player.e.upgrades = [11, 12, 13, 21, 22, 23, 31, 32, 33]
    player.a.upgrades = [11, 12, 13, 21, 22, 23]
    player.n.upgrades = [11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34]
    player.n.points = new Decimal(100)
}

addLayer("f", {
    name: "further enhamce",
    symbol: "F",
    row: 4,
    position: 0,
    branches: ["n"],
    color: "#4712ab",
    resource: "further enhance points",
    startData() {return {
        unlocked: true,

        points: new Decimal(0),
        best: new Decimal(0),

        textInput: "",
        selectedGrid: -1,

        mergeSpawnTimer: new Decimal(0),
        replicantiTimer: new Decimal(0),

        enhancedReplicanti: new Decimal(1),

        enhanceEnergy: new Decimal(0),

        furthererEnhancePoints: new Decimal(0),
        furthestEnhancePoints: new Decimal(1),
    }},
    type: "none",

    getPointGen() {
        let gain = new Decimal(0)
        for (i in player.f.grid) {
            if (player.f.grid[i].isMergeable) gain = gain.add(Decimal.pow(tmp.f.mergeEnhancerBase, player.f.grid[i].tier.sub(1)))
        }
        gain = gain.mul(tmp.f.enhancedReplicantiEffect)
        gain = gain.mul(tmp.f.enhanceEnergyEffect)
        gain = gain.mul(tmp.f.furthererEnhanceEffect)
        if (hasUpgrade('f', 41)) gain = gain.mul(upgradeEffect('f', 41))
        if (hasUpgrade('f', 42)) gain = gain.mul(upgradeEffect('f', 42))
        gain = gain.pow(buyableEffect('f', 51))
        return gain
    },

    mergeEnhancerBase() {
        let base = new Decimal(3)
        if (hasUpgrade('f', 22)) base = base.add(0.5)
        if (hasUpgrade('f', 15)) base = base.add(0.5)
        return base
    },

    enhancedReplicantiInterval() {
        let interval = new Decimal(1).mul(buyableEffect('f', 22))
        if (hasUpgrade('f', 12)) interval = interval.div(upgradeEffect('f', 12))
        if (hasUpgrade('f', 14)) interval = interval.div(20)
        if (hasUpgrade('f', 43)) interval = interval.div(tmp.f.effect)
        interval = interval.mul(tmp.f.enhancedReplicantiSoftcapEffect)
        return interval
    },
    enhancedReplicantiEffect() {
        let effect = player.f.enhancedReplicanti.log(10).pow(2).add(1)
        return effect
    },
    enhancedReplicantiLimit() {
        let limit = Decimal.pow(2, 1024)
        if (hasUpgrade('f', 11)) limit = limit.pow(upgradeEffect('f', 11))
        if (hasUpgrade('f', 13)) limit = limit.pow(upgradeEffect('f', 13))
        if (hasUpgrade('f', 43)) limit = limit.tetrate(tmp.f.effect)
        return limit
    },
    enhancedReplicantiSoftcapEffect() {
        let effect = player.f.enhancedReplicanti.div(Decimal.pow(2, 1024)).max(1).log(10).add(1).log(5).pow(2).add(1)
        return effect
    },

    enhanceEnergyGenSpeed() {
        let gain = new Decimal(1)
        gain = gain.mul(buyableEffect('f', 42))
        if (hasUpgrade('f', 24)) gain = gain.mul(upgradeEffect('f', 24))
        if (hasUpgrade('f', 44)) gain = gain.mul(tmp.f.effect)
        return gain
    },
    enhanceEnergyExponent() {
        let exp = new Decimal(1)
        exp = exp.add(buyableEffect('f', 41))
        if (hasUpgrade('f', 23)) exp = exp.add(upgradeEffect('f', 23))
        if (hasUpgrade('f', 44)) exp = exp.add(tmp.f.effect)
        return exp
    },
    enhanceEnergyEffect() {
        let effect = player.f.enhanceEnergy.add(1).log(10).pow(1.2).add(1)
        if (hasUpgrade('f', 25)) effect = player.f.enhanceEnergy.add(1).log(3).pow(3).add(1)
        return effect
    },

    furthererEnhanceGain() {
        let gain = player.f.points.div(1e99).add(1).log(10).pow(0.5)
        return gain.mul(tmp.f.furthererEnhanceGainMult).pow(tmp.f.furthererEnhanceGainExp).floor()
    },
    furthererEnhanceGainMult() {
        let mult = new Decimal(1)
        mult = mult.mul(player.f.furthestEnhancePoints)
        return mult
    },
    furthererEnhanceGainExp() {
        let exp = new Decimal(1)
        return exp 
    },
    furthererEnhanceNextAt() {
        let baseGain = tmp.f.furthererEnhanceGain.root(tmp.f.furthererEnhanceGainExp).div(tmp.f.furthererEnhanceGainMult)
        return Decimal.pow(10, baseGain.add(1).pow(2)).mul(1e99)
    },
    furthererEnhanceEffect() {
        let effect = tmp.f.furthererEnhanceEffectBase.pow(player.f.furthererEnhancePoints)
        return effect 
    },
    furthererEnhanceEffectBase() {
        let base = new Decimal(1.01)
        return base
    },

    furthestEnhancePointGen() {
        let mult = new Decimal(1.01)
        mult = mult.mul(buyableEffect('f', 51))
        return mult
    },

    effect() {
        let eff = player.f.points.add(1).log(10).add(1).min(Decimal.pow(2, 1023).mul(1.999))
        return eff
    },
    effectDescription() {
        return `which are tetrating point gain by ${format(tmp.f.effect)}<br>(+${format(tmp.f.getPointGen)}/s)`
    },

    upgrades: {
        11: {
            title: "Replicate Further",
            description() {return "Delay the enhanced replicanti limit based on further enhance points. Effect: ^" + format(this.effect())},
            effect() {
                let effect = player.f.points.add(1).log(10).pow(0.1).add(1)
                return effect 
            },
            cost: new Decimal(1e9),
            currencyLayer: "f",
            currencyDisplayName: "enhance energy",
            currencyInternalName: "enhanceEnergy",
            unlocked() {return true},
        },
        12: {
            title: "Replicative Amplifier",
            description() {return "Multiply enhanced replicanti speed based on enhance energy. Effect: x" + format(this.effect())}, 
            effect() {
                let effect = player.f.enhanceEnergy.add(1).log(100).pow(0.2).add(1)
                return effect
            },
            cost: new Decimal(1e18),
            currencyLayer: "f",
            currencyDisplayName: "enhance energy",
            currencyInternalName: "enhanceEnergy",
            unlocked() {return hasUpgrade('f', 11)},
        },
        13: {
            title: "Containment Breach",
            description() {return "Delay the enhanced replicanti limit based on enhanced replicanti. Effect ^" + format(this.effect())},
            effect() {
                let effect = player.f.enhancedReplicanti.add(1).log(10).add(1).log(10).add(1)
                return effect
            },
            cost: new Decimal(1e45),
            currencyLayer: "f",
            currencyDisplayName: "enhance energy",
            currencyInternalName: "enhanceEnergy",
            unlocked() {return hasUpgrade('f', 12)}
        },
        14: {
            title: "The Swarm",
            description() {return "Enhanced replicanti replicates 20 times faster."},
            cost: new Decimal(1e54),
            currencyLayer: "f",
            currencyDisplayName: "enhance energy",
            currencyInternalName: "enhanceEnergy",
            unlocked() {return hasUpgrade('f', 13)}
        },
        15: {
            title: "Strongerer Mergeable Enhancers",
            description() {return "Increase the mergeable enhancer base again. (x3.50 -> x4.00)"},
            cost: new Decimal(1e100),
            currencyLayer: "f",
            currencyDisplayName: "enhance energy",
            currencyInternalName: "enhanceEnergy",
            unlocked() {return hasUpgrade('f', 14)}
        },
        21: {
            title: "Recombination",
            description() {return "Enhanced replicanti galaxy requirement scales 25% slower."},
            cost: new Decimal(1e42),
            unlocked() {return hasUpgrade('f', 11)},
        },
        22: {
            title: "Stronger Mergeable Enhancers",
            description() {return "Increase the mergeable enhancer base. (x3.00 -> x3.50)"},
            cost: new Decimal(1e48),
            unlocked() {return hasUpgrade('f', 21)}
        },
        23: {
            title: "Self-Charging Enhancers",
            description() {return "Enhance energy increases its own exponent. Effect: +" + format(this.effect())},
            effect() {
                let effect = player.f.enhanceEnergy.add(1).log(10).add(1).log(10).add(1)
                return effect
            },
            cost: new Decimal(1e63),
            unlocked() {return hasUpgrade('f', 22)}
        },
        24: {
            title: "Speed Tiers",
            description() {return "Your highest Mergeable Enhancer tier multiplies enhance energy generation speed. Effect: x" + format(this.effect())},
            effect() {
                let effect = new Decimal(1)
                for (i in player.f.grid) {
                    if (player.f.grid[i].tier.gte(effect)) effect = player.f.grid[i].tier
                }
                return effect
            },
            cost: new Decimal(1e72),
            unlocked() {return hasUpgrade('f', 23)}
        },
        25: {
            title: "Enhance<sup>2</sup> Energy",
            description() {return "Improve the enhanced energy effect formula."},
            cost: Decimal.dInf,
            unlocked() {return hasUpgrade('f', 24)}
        },
        31: {
            title: "Auto Mergeable Enhancers",
            description() {return "Automatically earn levels of <b>Better Mergeable Enhancers</b> and <b>Faster Mergeable Enhancers</b> whenever possible."},
            cost: new Decimal(1),
            currencyLayer: "f",
            currencyDisplayName: "furtherer enhance points",
            currencyInternalName: "furthererEnhancePoints",
            unlocked() {return true}
        },
        32: {
            title: "Keep Enhanced Replicanti",
            description() {return "Start further enhance resets with <b>Luckier Enhanced Replicanti</b> and <b>Faster Enhanced Replicanti</b> at max level."},
            cost: new Decimal(1),
            onPurchase() {
                setBuyableAmount('f', 21, new Decimal(90))
                setBuyableAmount('f', 22, new Decimal(40))
            },
            currencyLayer: "f",
            currencyDisplayName: "furtherer enhance points",
            currencyInternalName: "furthererEnhancePoints",
            unlocked() {return true}
        },
        33: {
            title: "Auto Enhanced Replicanti",
            description() {return "Automatically earn <b>Enhanced Replicanti Galaxies</b> whenever possible."},
            cost: new Decimal(1),
            currencyLayer: "f",
            currencyDisplayName: "furtherer enhance points",
            currencyInternalName: "furthererEnhancePoints",
            unlocked() {return true}
        },
        34: {
            title: "Keep Enhance Energy",
            description() {return "Start furtherer enhance resets with all enhance energy upgrades purchased."},
            cost: new Decimal(1),
            onPurchase() {
                player.f.upgrades.push(...[11, 12, 13, 14, 15, 21, 22, 23, 24, 25])
            },
            currencyLayer: "f",
            currencyDisplayName: "furtherer enhance points",
            currencyInternalName: "furthererEnhancePoints",
            unlocked() {return true}
        },
        35: {
            title: "Auto Enhance Energy",
            description() {return "Automatically earn levels of <b>Better Enhance Energy</b> and <b>Faster Enhance Energy</b> whenever possible."},
            cost: new Decimal(1),
            currencyLayer: "f",
            currencyDisplayName: "furtherer enhance points",
            currencyInternalName: "furthererEnhancePoints",
            unlocked() {return true}
        },
        41: {
            title: "Closer Enhance Points",
            description() {return "Earn a multiplier to further enhance points based on points. Effect: x" + format(this.effect())},
            cost: new Decimal(3),
            effect() {
                let effect = player.points.add(1).slog(10).add(1).pow(0.5)
                return effect
            },
            currencyLayer: "f",
            currencyDisplayName: "furtherer enhance points",
            currencyInternalName: "furthererEnhancePoints",
            unlocked() {return hasUpgrade('f', 31)}
        },
        42: {
            title: "This Hasn't Inflated Yet?",
            description() {return "Earn a multiplier to further enhance points based on intensifiers. Effect: x" + format(this.effect())},
            cost: new Decimal(10),
            effect() {
                let effect = player.n.points.add(1).log(10).pow(3).add(1)
                return effect
            },
            currencyLayer: "f",
            currencyDisplayName: "furtherer enhance points",
            currencyInternalName: "furthererEnhancePoints",
            unlocked() {return hasUpgrade('f', 32)}
        },
        43: {
            title: "Decapitate",
            description() {return "Improve Enhanced Replicanti based on further enhance point effect and no longer reset it on Furtherer Enhance."},
            cost: new Decimal(33),
            currencyLayer: "f",
            currencyDisplayName: "furtherer enhance points",
            currencyInternalName: "furthererEnhancePoints",
            unlocked() {return hasUpgrade('f', 33)}
        },
        44: {
            title: "Amplify",
            description() {return "Improve Enhance Energy based on further enhance point effect and no longer reset it on Furtherer Enhance."},
            cost: new Decimal(75),
            currencyLayer: "f",
            currencyDisplayName: "furtherer enhance points",
            currencyInternalName: "furthererEnhancePoints",
            unlocked() {return hasUpgrade('f', 34)}
        },
        45: {
            title: "Reach My Limit",
            description() {return hasUpgrade('f', 45) ? "Unlock the Exponential Enhancer and Furthest Enhance Points, and Mergeable Enhancers are no longer reset on Furtherer Enhance." : "..."},
            cost: new Decimal(100),
            currencyLayer: "f",
            currencyDisplayName: "furtherer enhance points",
            currencyInternalName: "furthererEnhancePoints",
            unlocked() {return hasUpgrade('f', 35) && hasUpgrade('f', 44)}
        },
    },

    buyables: {
        11: {
            title() {return "Better Mergeable Enhancers (" + formatWhole(getBuyableAmount(this.layer, this.id)) + (this.freeLevels().neq(0) ? " + " + formatWhole(this.freeLevels()) : "") + ")"},
            cost(x) {
                let cost = Decimal.pow(3, x.pow(1.1)).mul(1000)
                return cost
            },
            display() {return `Increasing minimum mergeable enhancer tier by +${formatWhole(this.effectBase())} each
                Currently: +${formatWhole(this.effect())}
                Cost: ${format(this.cost())} further enhance points`
            },
            freeLevels() {
                let free = new Decimal(0)
                free = free.add(getBuyableAmount(this.layer, 31))
                return free
            },
            effect() {
                let effect = this.effectBase().mul(getBuyableAmount(this.layer, this.id).add(this.freeLevels()))
                return effect
            },
            effectBase() {
                let base = new Decimal(1)
                return base
            },
            canAfford() {return player.f.points.gte(this.cost())},
            buy() {
                player.f.points = player.f.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))

                for (i in player.f.grid) {
                    if (player.f.grid[i].isMergeable && player.f.grid[i].tier.lt(buyableEffect(this.layer, this.id).add(2))) {
                        player.f.grid[i].tier = buyableEffect(this.layer, this.id).add(2)
                    }
                }
            },
            unlocked() {return true},
        },
        12: {
            title() {return "Faster Mergeable Enhancers (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50)"},
            cost(x) {
                let cost = Decimal.pow(4, x.pow(1.05)).mul(2500)
                return cost
            },
            display() {return `Multiplying mergeable enhancer spawn time by x${formatWhole(this.effectBase())} each
                Currently: x${formatWhole(this.effect())}
                Cost: ${format(this.cost())} further enhance points`
            },
            effect() {
                let effect = this.effectBase().pow(getBuyableAmount(this.layer, this.id))
                return effect
            },
            effectBase() {
                let base = new Decimal(0.9)
                return base
            },
            canAfford() {return player.f.points.gte(this.cost())},
            purchaseLimit() {return new Decimal(50)},
            buy() {
                player.f.points = player.f.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {return true},
        },
        21: {
            title() {return "Luckier Enhanced Replicanti (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/90)"},
            cost(x) {
                let cost = Decimal.pow(1.3, x).mul(1e9)
                return cost
            },
            display() {return `Increasing enhanced replicanti replication chance by +${formatWhole(this.effectBase().mul(100))}% each
                Currently: ${formatWhole(this.effect().mul(100))}%
                Cost: ${format(this.cost())} further enhance points`
            },
            effect() {
                let effect = this.effectBase().mul(getBuyableAmount(this.layer, this.id)).add(0.1)
                return effect
            },
            effectBase() {
                let base = new Decimal(0.01)
                return base
            },
            canAfford() {return player.f.points.gte(this.cost())},
            purchaseLimit() {return new Decimal(90)},
            buy() {
                player.f.points = player.f.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {return true},           
        },
        22: {
            title() {return "Faster Enhanced Replicanti (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/40)"},
            cost(x) {
                let cost = Decimal.pow(1.75, x).mul(1e10)
                return cost
            },
            display() {return `Multiplying the enhanced replicanti replication interval by x${formatWhole(this.effectBase())} each
                Currently: x${formatWhole(this.effect())}
                Cost: ${format(this.cost())} further enhance points`
            },
            effect() {
                let effect = this.effectBase().pow(getBuyableAmount(this.layer, this.id))
                return effect
            },
            effectBase() {
                let base = new Decimal(0.9)
                return base
            },
            canAfford() {return player.f.points.gte(this.cost())},
            purchaseLimit() {return new Decimal(40)},
            buy() {
                player.f.points = player.f.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {return true},           
        },
        31: {
            title() {return "Enhanced Replicanti Galaxy (" + formatWhole(getBuyableAmount(this.layer, this.id)) + ")"},
            cost(x) {
                let cost = Decimal.pow(2, Decimal.pow(2, x.add(2)))
                if (hasUpgrade('f', 21)) cost = Decimal.pow(2, Decimal.pow(2, x.mul(0.75).add(2)))
                return cost
            },
            display() {return `Condense enhanced replicanti into an enhanced galaxy, which resets it but grants a free level of <b>Better Mergeable Enhancers</b> each
                Requires: ${format(this.cost())} enhanced replicanti`
            },
            canAfford() {return player.f.enhancedReplicanti.gte(this.cost())},
            buy() {
                player.f.enhancedReplicanti = new Decimal(1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))

                for (i in player.f.grid) {
                    if (player.f.grid[i].isMergeable && player.f.grid[i].tier.lt(buyableEffect('f', 11).add(2))) {
                        player.f.grid[i].tier = buyableEffect('f', 11).add(2)
                    }
                }
            },
            unlocked() {return true},           
        },
        41: {
            title() {return "Better Enhance Energy (" + formatWhole(getBuyableAmount(this.layer, this.id)) + ")"},
            cost(x) {
                let cost = Decimal.pow(10, x.pow(1.5)).mul(1e33)
                return cost
            },
            display() {return `Increasing enhance energy exponent by +${format(this.effectBase())} each
                Currently: +${format(this.effect())}
                Cost: ${format(this.cost())} further enhance points`
            },
            effect() {
                let effect = this.effectBase().mul(getBuyableAmount(this.layer, this.id))
                return effect
            },
            effectBase() {
                let base = new Decimal(1)
                return base
            }, 
            canAfford() {return player.f.points.gte(this.cost())},
            buy() {
                player.f.points = player.f.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            }
        },
        42: {
            title() {return "Faster Enhance Energy (" + formatWhole(getBuyableAmount(this.layer, this.id)) + ")"},
            cost(x) {
                let cost = Decimal.pow(10, x.pow(1.2)).mul(1e36)
                return cost
            },
            display() {return `Multiplying enhance energy speed by x${format(this.effectBase())} each
                Currently: x${format(this.effect())}
                Cost: ${format(this.cost())} further enhance points`
            },
            effect() {
                let effect = this.effectBase().pow(getBuyableAmount(this.layer, this.id))
                return effect
            },
            effectBase() {
                let base = new Decimal(1.25)
                return base
            },
            canAfford() {return player.f.points.gte(this.cost())},
            buy() {
                player.f.points = player.f.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        51: {
            title() {return "The Exponential Enhancer (" + formatWhole(getBuyableAmount(this.layer, this.id)) + ")"},
            cost(x) {
                let cost = Decimal.pow(10, Decimal.pow(10, x.pow(1.25)))
                return cost
            },
            display() {return `Multiplying further and furthest enhance point gain exponents by x${format(this.effectBase())} each
                Currently: ^${format(this.effect())}
                Cost: ${format(this.cost())} further enhance points`
            },
            effect() {
                let effect = this.effectBase().pow(getBuyableAmount(this.layer, this.id))
                return effect
            },
            effectBase() {
                let base = new Decimal(1.1)
                return base
            },
            canAfford() {return player.f.points.gte(this.cost())},
            buy() {
                player.f.points = player.f.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {return hasUpgrade('f', 45)}
        },
    },

    milestones: {
        0: {
            requirementDescription: "Reach the Maximum Safe Integer (~F9.00e15)",
            effectDescription: "Point gain is set to 10^^(further enhance point effect), and passively gain 100% of furtherer enhance point gain every second",
            done() {return getPointGen().gte(Decimal.tetrate(10, Number.MAX_SAFE_INTEGER - 1))},
            unlocked() {return hasUpgrade('f', 45)}
        },
    },

    clickables: {
        11: {
            title: ">",
            onClick() {
                dialogueStep = 0
                if (furtherDialogue[dialogueID].dialogue[dialogueLine+1] !== undefined) dialogueLine++
                if (player.f.textInput !== "" && dialogueID == "introduction" && dialogueLine == 10) {player.name = player.f.textInput; player.f.textInput = ""}
            },
            canClick() {
                if (player.f.textInput.length < 3 && dialogueID == "introduction" && dialogueLine == 10) return false
                if (furtherDialogue[dialogueID].dialogue[dialogueLine+1] == undefined) return false
                return true
            },
        },
        12: {
            title() {return `Reset for +${formatWhole(tmp.f.furthererEnhanceGain)} furtherer enhance points`},
            display() {return `<br>Next at ${format(tmp.f.furthererEnhanceNextAt)} further enhance points`},
            onClick() {
                player.f.furthererEnhancePoints = player.f.furthererEnhancePoints.add(tmp.f.furthererEnhanceGain)
                player.f.points = new Decimal(0)
                if (!hasUpgrade('f', 43)) player.f.enhancedReplicanti = new Decimal(1)
                if (!hasUpgrade('f', 44)) player.f.enhanceEnergy = new Decimal(0)
                setBuyableAmount('f', 11, new Decimal(0))
                setBuyableAmount('f', 12, new Decimal(0))
                if (!hasUpgrade('f', 43)) setBuyableAmount('f', 21, new Decimal(0))
                if (!hasUpgrade('f', 43)) setBuyableAmount('f', 22, new Decimal(0))
                if (!hasUpgrade('f', 43)) setBuyableAmount('f', 31, new Decimal(0))
                if (!hasUpgrade('f', 44)) setBuyableAmount('f', 41, new Decimal(0))
                if (!hasUpgrade('f', 44)) setBuyableAmount('f', 42, new Decimal(0))

                if (hasUpgrade('f', 32)) {
                    setBuyableAmount('f', 21, new Decimal(90))
                    setBuyableAmount('f', 22, new Decimal(40))
                }
                if (!hasUpgrade('f', 34)) {
                    let keptUpgrades = []
                    if (hasUpgrade('f', 31)) keptUpgrades.push(31)
                    if (hasUpgrade('f', 32)) keptUpgrades.push(32)
                    if (hasUpgrade('f', 33)) keptUpgrades.push(33)
                    if (hasUpgrade('f', 34)) keptUpgrades.push(34)
                    if (hasUpgrade('f', 35)) keptUpgrades.push(35)
                    if (hasUpgrade('f', 41)) keptUpgrades.push(41)
                    if (hasUpgrade('f', 42)) keptUpgrades.push(42)
                    if (hasUpgrade('f', 43)) keptUpgrades.push(43)
                    if (hasUpgrade('f', 44)) keptUpgrades.push(44)
                    if (hasUpgrade('f', 45)) keptUpgrades.push(45)
                
                    player.f.upgrades.push(...keptUpgrades)
                }
                

                for (i in player.f.grid) {
                    player.f.grid[i] = {tier: new Decimal(0), isMergeable: false}
                }
                player.f.points = new Decimal(0)
                player.f.enhanceEnergy = new Decimal(0)

                player.f.furthestEnhancePoints = new Decimal(1)
            },
            canClick() {return player.f.points.gte(1e100)},
            style() {return {"width": "200px", "height": "125px"}}
        }
    },

    infoboxes: {
        erin: {
            title: "Erin",
            body() {return `
                    <br><img src='resources/erinPortraits/${furtherDialogue[dialogueID].dialogue[dialogueLine] !== undefined ? (furtherDialogue[dialogueID].dialogue[dialogueLine].erinPortrait + (dialogueStep > furtherDialogue[dialogueID].dialogue[dialogueLine].erinText().length ? "Still" : "")) : "erinNormalStill"}.png' width='305' height='363'><br>
                    <br><p>${renderDialogue(Math.floor(dialogueStep))}</p><br>
                    <p>> ${furtherDialogue[dialogueID].dialogue[dialogueLine] !== undefined ? (furtherDialogue[dialogueID].dialogue[dialogueLine].command !== undefined ? furtherDialogue[dialogueID].dialogue[dialogueLine].command : "") : ""}</p><br>
            `},
            unlocked() {return true}
        },
    },

    grid: {
        rows: 5,
        cols: 5,
        getStartData() {return {
            tier: new Decimal(0),
            isMergeable: false
        }},
        getUnlocked(id) {
            return true
        },
        getCanClick(data, id) {
            return data.isMergeable || player.f.selectedGrid != -1
        },
        getStyle(data, id) {
            if (player.f.selectedGrid == id) return {'background-color': '#ffffff', 'border-color': '#ffffff'}
            if (data.isMergeable) {
                let colors = ['#4712ab', '#b82fbd', "#cc67fe", "#6e64c4", "#9127bd", "#9c65b7", "#504899", '#6c1db7']
                if (player.f.grid[id].tier.div(8).sub(player.f.grid[id].tier.div(8).floor()).mul(8).eq(0)) return {'background-color': colors[0]}
                if (player.f.grid[id].tier.div(8).sub(player.f.grid[id].tier.div(8).floor()).mul(8).eq(1)) return {'background-color': colors[1]}
                if (player.f.grid[id].tier.div(8).sub(player.f.grid[id].tier.div(8).floor()).mul(8).eq(2)) return {'background-color': colors[2]}
                if (player.f.grid[id].tier.div(8).sub(player.f.grid[id].tier.div(8).floor()).mul(8).eq(3)) return {'background-color': colors[3]}
                if (player.f.grid[id].tier.div(8).sub(player.f.grid[id].tier.div(8).floor()).mul(8).eq(4)) return {'background-color': colors[4]}
                if (player.f.grid[id].tier.div(8).sub(player.f.grid[id].tier.div(8).floor()).mul(8).eq(5)) return {'background-color': colors[5]}
                if (player.f.grid[id].tier.div(8).sub(player.f.grid[id].tier.div(8).floor()).mul(8).eq(6)) return {'background-color': colors[6]}
                if (player.f.grid[id].tier.div(8).sub(player.f.grid[id].tier.div(8).floor()).mul(8).eq(7)) return {'background-color': colors[7]}
            }
            return {'background-color': '#000000', 'border-color': '#000000'}
        },
        getTitle(data, id) {
            if (data.isMergeable) return `Tier ${formatWhole(data.tier)}`
            else return ""
        },
        getDisplay(data, id) {
            if (data.isMergeable) return `+${format(Decimal.pow(tmp.f.mergeEnhancerBase, player.f.grid[id].tier.sub(1)))} further enhance points/s`
            else return ""
        },
        /* getEffect(data, id) {
            if (player.f.grid[id].isMergeable) return Decimal.pow(tmp.f.mergeEnhancerBase, player.f.grid[id].tier)
            else return new Decimal(0)
        }, */
        onClick(data, id) {
            if (player.f.selectedGrid != -1) {
                if (player.f.selectedGrid == id) {player.f.selectedGrid = -1; return}
                if (player.f.grid[id].isMergeable) {
                    if (player.f.grid[player.f.selectedGrid].tier.eq(player.f.grid[id].tier)) {
                        player.f.grid[id].tier = player.f.grid[id].tier.add(1)
                        player.f.grid[player.f.selectedGrid] = {tier: new Decimal(0), isMergeable: false}
                    } else {
                        player.f.selectedGrid = id
                    }
                } else {
                    player.f.grid[id] = {tier: player.f.grid[player.f.selectedGrid].tier, isMergeable: true}
                    player.f.grid[player.f.selectedGrid] = {tier: new Decimal(0), isMergeable: false}
                }
                player.f.selectedGrid = -1
            } else {
                player.f.selectedGrid = id
            }
        }
    },

    bars: {
        mergeSpawnTimer: {
            direction: RIGHT,
            width: 300,
            height: 30,
            progress() {
                return player.f.mergeSpawnTimer / new Decimal(10).mul(buyableEffect('f', 12))
            },
            display() {
                return `${format(player.f.mergeSpawnTimer)}s/${format(new Decimal(10).mul(buyableEffect('f', 12)))}s`
            },
            fillStyle: {'background-color': '#4712ab'},
            baseStyle: {'background-color': '#000000'}
        },
        replicantiTimer: {
            direction: RIGHT,
            width: 300,
            height: 30,
            progress() {
                return player.f.replicantiTimer / tmp.f.enhancedReplicantiInterval
            },
            display() {
                return `${format(player.f.replicantiTimer)}s/${format(tmp.f.enhancedReplicantiInterval)}s`
            },
            fillStyle: {'background-color': '#4712ab'},
            baseStyle: {'background-color': '#000000'}
        }
    },

    update(diff) {
        if (player.name !== "" || (player.f.best.gt(0) || dialogueLine > 10)) player.f.points = player.f.points.add(tmp.f.getPointGen.mul(diff))
        if (player.f.points.gte(player.f.best)) player.f.best = player.f.points

        for (dialogue in furtherDialogue) {
            if (furtherDialogue[dialogue].trigger()) {
                dialogueID = dialogue
            }
        }
        dialogueStep += diff * 25
        if ((tabLastTick !== player.subtabs.f.furtherEnhance && player.subtabs.f.furtherEnhance == "Erin" && idLastTick !== dialogueID) || (furtherDialogue[dialogueID].dialogue[dialogueLine] == undefined)) {
            dialogueStep = 0
            dialogueLine = 0
        }
        tabLastTick = player.subtabs.f.furtherEnhance
        idLastTick = dialogueID

        player.f.mergeSpawnTimer = player.f.mergeSpawnTimer.add(diff)
        if (player.f.mergeSpawnTimer >= new Decimal(10).mul(buyableEffect('f', 12)) && (player.name !== "" || (player.f.best.gt(0) || dialogueLine > 10))) {
            player.f.mergeSpawnTimer = new Decimal(0)
            let spawnable = []
            for (i in player.f.grid) {
                if (!player.f.grid[i].isMergeable) spawnable.push(i)
            }
            if (spawnable.length > 0) {
                let spawnIndex = spawnable[Math.floor(Math.random() * spawnable.length)]
                player.f.grid[spawnIndex] = {tier: buyableEffect('f', 11).add(1), isMergeable: true}
            }
        }

        if (player.f.best.gte(1e33)) { // auto merge
            let mergeable = []
            for (i in player.f.grid) {
                if (player.f.grid[i].isMergeable) mergeable.push(i)
            }
            for (i in mergeable) {
                for (j in mergeable) {
                    if (i != j && player.f.grid[mergeable[i]].tier.eq(player.f.grid[mergeable[j]].tier)) {
                        player.f.grid[mergeable[i]].tier = player.f.grid[mergeable[i]].tier.add(1)
                        player.f.grid[mergeable[j]] = {tier: new Decimal(0), isMergeable: false}
                    }
                }
            }
        }

        player.f.replicantiTimer = player.f.replicantiTimer.add(diff)
        if (player.f.replicantiTimer >= tmp.f.enhancedReplicantiInterval && player.f.best.gte(1e9)) {
            player.f.replicantiTimer = new Decimal(0)
            if (new Decimal(Math.random()).lte(buyableEffect('f', 21))) {
                if (tmp.f.enhancedReplicantiInterval.lt(diff)) player.f.enhancedReplicanti = player.f.enhancedReplicanti.mul(Decimal.pow(1.25, Decimal.div(diff, tmp.f.enhancedReplicantiInterval)))
                player.f.enhancedReplicanti = player.f.enhancedReplicanti.mul(1.25)
                if (player.f.enhancedReplicanti.gte(tmp.f.enhancedReplicantiLimit)) player.f.enhancedReplicanti = tmp.f.enhancedReplicantiLimit
            }
        }

        if (player.f.best.gte(1e33)) player.f.enhanceEnergy = player.f.enhanceEnergy.root(tmp.f.enhanceEnergyExponent).add(tmp.f.enhanceEnergyGenSpeed.mul(diff)).pow(tmp.f.enhanceEnergyExponent)
    
        if (hasUpgrade('f', 31)) {
            if (layers.f.buyables[11].canAfford()) {
                setBuyableAmount('f', 11, player.f.points.div(1000).max(1).log(3).root(1.1).ceil())
                for (i in player.f.grid) {
                    if (player.f.grid[i].isMergeable && player.f.grid[i].tier.lt(buyableEffect('f', 11).add(2))) {
                        player.f.grid[i].tier = buyableEffect('f', 11).add(2)
                    }
                }
            }
            if (layers.f.buyables[12].canAfford()) setBuyableAmount('f', 12, player.f.points.div(2500).max(1).log(4).root(1.05).ceil().min(50))
        }
        if (hasUpgrade('f', 33)) {
            if (layers.f.buyables[31].canAfford()) {
                setBuyableAmount('f', 31, player.f.enhancedReplicanti.max(1).log(2).max(1).log(2).div(0.75).sub(2).ceil())
                for (i in player.f.grid) {
                    if (player.f.grid[i].isMergeable && player.f.grid[i].tier.lt(buyableEffect('f', 11).add(2))) {
                        player.f.grid[i].tier = buyableEffect('f', 11).add(2)
                    }
                }
            }
        }
        if (hasUpgrade('f', 35)) {
            if (layers.f.buyables[41].canAfford()) setBuyableAmount('f', 41, player.f.points.div(1e33).max(1).log(10).root(1.5).ceil())
            if (layers.f.buyables[42].canAfford()) setBuyableAmount('f', 42, player.f.points.div(1e36).max(1).log(10).root(1.2).ceil())
        }

        if (hasUpgrade('f', 45)) player.f.furthestEnhancePoints = player.f.furthestEnhancePoints.mul(tmp.f.furthestEnhancePointGen.pow(diff))
        if (hasMilestone('f', 0)) player.f.furthererEnhancePoints = player.f.furthererEnhancePoints.add(tmp.f.furthererEnhanceGain.mul(diff))
    },

    microtabs: {
        furtherEnhance: {
            "Erin": {
                content: [
                    "blank",
                    ["infobox", "erin"],
                    ["text-input", "textInput"],
                    ["clickable", [11]]
                ]
            },
            "Merge Enhancement": {
                content: [
                    "blank",
                    ["bar", "mergeSpawnTimer"],
                    "grid",
                    "blank",
                    ["buyables", [1]]
                ],
                unlocked() {return player.name !== ""  || (player.f.best.gt(0) || dialogueLine > 10)}
            },
            "Enhanced Replicanti": {
                content: [
                    "blank",
                    ["display-text", () => {return `You have ${format(player.f.enhancedReplicanti)}/${format(tmp.f.enhancedReplicantiLimit)} enhanced replicanti, which multiply further enhance point gain by ${format(tmp.f.enhancedReplicantiEffect)}`}],
                    ["bar", "replicantiTimer"],
                    "blank",
                    ["display-text", () => {if (player.f.enhancedReplicanti.gte(Decimal.pow(2, 1024))) return `Enhanced replicanti past 1.80e308 is multiplying time between replications by x${format(tmp.f.enhancedReplicantiSoftcapEffect)}`}],
                    "blank",
                    ["buyables", [2, 3]]
                ],
                unlocked() {return player.f.best.gte(1e9)}
            },
            "Enhance Energy": {
                content: [
                    "blank",
                    ["display-text", () => {return `You have ${format(player.f.enhanceEnergy)} enhance energy<sup>${format(tmp.f.enhanceEnergyExponent)}</sup>, which multiply further enhance point gain by ${format(tmp.f.enhanceEnergyEffect)}`}],
                    "blank",
                    ["buyables", [4]],
                    "blank",
                    ["upgrades", [1, 2]]
                ],
                unlocked() {return player.f.best.gte(1e33)}
            },
            "Furthest Enhance": {
                content: [
                    "blank",
                    ["display-text", () => {return `You have ${formatWhole(player.f.furthererEnhancePoints)} furtherer enhance points, which multiply further enhance point gain by x${format(tmp.f.furthererEnhanceEffect)}`}],
                    "blank",
                    ["clickable", [12]],
                    "blank",
                    ["upgrades", [3, 4]],
                    "blank",
                    ["display-text", () => {if (hasUpgrade('f', 45)) return `You have ${format(player.f.furthestEnhancePoints)} furthest enhance points (x${format(tmp.f.furthestEnhancePointGen)}/s), which directly multiply furtherer enhance point gain`}],
                    "blank",
                    ["buyables", [5]],
                    "blank",
                    "milestones"
                ],
                unlocked() {return player.f.best.gte(1e100)}
            },
        }
    },

    tabFormat: [
        "main-display",
        ["microtabs", "furtherEnhance"]
    ],

    layerShown() {return hasUpgrade('n', 34)}
})
