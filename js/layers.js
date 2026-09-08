addLayer("e", {
    name: "enhance",
    symbol: "E",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#b82fbd",
    requires: new Decimal(10),
    resource: "enhance points",
    baseResource: "points",

    baseAmount() {return player.points},
    getResetGain() {
        let base = player.points
        let gain = base.add(1).log(10).pow(0.5).floor()
        return gain.mul(tmp[this.layer].gainMult).pow(tmp[this.layer].gainExp).floor()
    },
    getNextAt() {
        let baseGain = tmp[this.layer].getResetGain.root(tmp[this.layer].gainExp).div(tmp[this.layer].gainMult)
        let nextAt = Decimal.pow(10, baseGain.add(1).pow(2))
        return nextAt
    },
    prestigeButtonText() {
        return `Reset for <b>+${formatWhole(tmp[this.layer].resetGain)}</b> enhance points<br><br>
        Next at ${format(tmp[this.layer].nextAt)} points`
    },
    canReset() {
        return player.points.gte(tmp[this.layer].requires)
    },
    type: "custom",

    gainMult() {
        mult = new Decimal(1)
        if (hasUpgrade("e", 21)) mult = mult.mul(upgradeEffect("e", 21))
        if (hasUpgrade("e", 23)) mult = mult.mul(upgradeEffect("e", 23))
        if (hasUpgrade("e", 32)) mult = mult.mul(upgradeEffect("e", 32))
        if (hasMilestone("i", 4)) mult = mult.mul(tmp.i.iteralPointEffect)
        mult = mult.mul(tmp.b.effect)
        mult = mult.mul(tmp.a.augmentEnergyEffect)
        return mult
    },
    gainExp() {
        let exp = new Decimal(1)
        if (hasUpgrade('a', 13)) exp = exp.mul(1.5)
        exp = exp.mul(buyableEffect('a', 11))
        return exp
    },
    passiveGeneration() {
        if (hasMilestone("i", 2)) return new Decimal(10)
    },

    effect() {
        let effect = tmp[this.layer].effectBase.pow(player[this.layer].points)
        return effect
    },
    effectBase() {
        let base = new Decimal(1)
        if (hasUpgrade("e", 11)) base = base.add(0.1)
        base = base.add(tmp.i.effect)
        base = base.sub(1).mul(tmp.b.effect).add(1)
        return base
    },
    effectDescription() {
        return `which are multiplying point gain by x${format(tmp[this.layer].effect)}`
    },

    upgrades: {
        11: {
            title: "Begin The Enhancement",
            description() {return "Earn x1.10 more points per enhance point. Effect: x" + format(tmp.e.effectBase)},
            cost: new Decimal(1),
            unlocked() {return true},
        },
        12: {
            title: "Powerup",
            description() {return "Raise point gain to the power of ^2."},
            cost: new Decimal(2),
            unlocked() {return hasUpgrade("e", 11)},
        },
        13: {
            title: "Pointy Points",
            description() {return "Earn an exponent to point gain based on points. Effect: ^" + format(this.effect())},
            cost: new Decimal(10),
            effect() {
                let effect = player.points.add(1).log(10).add(1).log(10).pow(0.66).add(1)
                return effect
            },
            unlocked() {return hasUpgrade("e", 12)},
        },
        21: {
            title: "ecnahnE",
            description() {return "Earn a multiplier to enhance points based on points. Effect: x" + format(this.effect())},
            cost: new Decimal(100),
            effect() {
                let effect = player.points.add(1).log(10).add(1).log(2).div(5).add(1)
                return effect
            },
            unlocked() {return hasUpgrade("e", 13)},
        },
        22: {
            title: "Actual Enhancement",
            description() {return "Unlock Enhancers."},
            cost: new Decimal(1000),
            unlocked() {return hasUpgrade("e", 21)},
        },
        23: {
            title: "Pointier",
            description() {return "Earn a multipier to enhance point gain based on enhance points. Effect: x" + format(this.effect())},
            cost: new Decimal(100000),
            effect () {
                let effect = player.e.points.add(1).log(10).pow(0.9).add(1)
                return effect
            },
            unlocked() {return hasUpgrade("e", 22)},
        },
        31: {
            title: "Enhancer Fragments",
            description() {return "Cheapen enhancer costs based on enhance points. Effect: /" + format(this.effect())},
            cost: new Decimal(1e9),
            effect() {
                let effect = player.e.points.add(1).pow(0.25)
                return effect
            },
            unlocked() {return hasUpgrade("e", 23) && hasMilestone("i", 1)},
        },
        32: {
            title: "Fractal Zoom",
            description() {return "Earn a multiplier to enhance point gain based on iterations. Effect: x" + format(this.effect())},
            cost: new Decimal(1e12),
            effect() {
                let effect = player.i.points.add(1).pow(1.1)
                return effect
            },
            unlocked() {return hasUpgrade("e", 31)},
        },
        33: {
            title: "Speed Scaling",
            description() {return "Add +0.1 to the enhancer effect base."},
            cost: new Decimal(1e21),
            unlocked() {return hasUpgrade("e", 32)},
        }
    },
    buyables: {
        11: {
            title() {return "Enhancers (" + formatWhole(getBuyableAmount(this.layer, this.id)) + ")"},
            cost(x) {
                let cost = Decimal.pow(10, x.add(1))
                if (x.gte(100)) cost = Decimal.pow(10, x.sub(100).mul(2).add(100).add(1))
                if (hasUpgrade('e', 31)) cost = cost.div(upgradeEffect("e", 31))
                return cost
            },
            display() {return `Multiplying point gain exponent by x${format(this.effectBase())} each
                Currently: ^${format(this.effect())}
                Cost: ${format(this.cost())} enhance points ${getBuyableAmount(this.layer, this.id).gte(100) ? "<br><b style='color: #ff0000'>[SOFTCAPPED]</b>" : ""}`
            },
            effect() {
                let effect = this.effectBase().pow(getBuyableAmount(this.layer, this.id))
                return effect
            },
            effectBase() {
                let base = new Decimal(2)
                if (hasUpgrade("e", 33)) base = base.add(0.1)
                if (hasUpgrade('a', 12)) base = base.add(upgradeEffect('a', 12))
                return base
            },
            canAfford() {return player[this.layer].points.gte(this.cost())},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {return hasUpgrade("e", 22)},
        }
    },
    row: 0,
    doReset(resettingLayer) {
        let keep = []
        let keptUpgrades = []

        if (hasMilestone('b', 0)) keep.push('upgrades')

        if (player.i.points.gte(1) && hasUpgrade("e", 11) && resettingLayer == 'i') keptUpgrades.push(11)
        if (player.i.points.gte(2) && hasUpgrade("e", 12) && resettingLayer == 'i') keptUpgrades.push(12)
        if (player.i.points.gte(3) && hasUpgrade("e", 13) && resettingLayer == 'i') keptUpgrades.push(13)
        if (player.i.points.gte(4) && hasUpgrade("e", 21) && resettingLayer == 'i') keptUpgrades.push(21)
        if (player.i.points.gte(5) && hasUpgrade("e", 22) && resettingLayer == 'i') keptUpgrades.push(22)
        if (player.i.points.gte(6) && hasUpgrade("e", 23) && resettingLayer == 'i') keptUpgrades.push(23)
        if (player.i.points.gte(7) && hasUpgrade("e", 31) && resettingLayer == 'i') keptUpgrades.push(31)
        if (player.i.points.gte(8) && hasUpgrade("e", 32) && resettingLayer == 'i') keptUpgrades.push(32)
        if (player.i.points.gte(9) && hasUpgrade("e", 33) && resettingLayer == 'i') keptUpgrades.push(33)

        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)

        player[this.layer].upgrades.push(...keptUpgrades)

        if (hasMilestone("i", 0)) player.e.points = player.e.points.add(player.i.points)
        if (hasMilestone('a', 0)) player.e.points = player.e.points.add(player.a.points)
        if (hasMilestone('a', 0)) setBuyableAmount('e', 11, player.a.points)
    },
    hotkeys: [
        {key: "e", description: "E: Reset for enhance points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    update(diff) {
        if (hasMilestone('i', 5) && tmp.e.buyables[11].canAfford) {
            if (getBuyableAmount('e', 11).gte(100)) setBuyableAmount('e', 11, player.e.points.mul(hasUpgrade('e', 31) ? upgradeEffect('e', 31) : 1).max(1).log(10).add(100).div(2).sub(100).max(1))
            setBuyableAmount('e', 11, player.e.points.mul(hasUpgrade('e', 31) ? upgradeEffect('e', 31) : 1).max(1).log(10).max(1))
        }
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        "buyables",
        "blank",
        "upgrades"
    ],
    layerShown(){return true}
})
addLayer("i", {
    name: "iterate",
    symbol: "I",
    row: 1,
    position: 0,
    branches: ["e"],
    color: "#cc67fe",
    requires: new Decimal("e1e9"),
    resource: "iterations",
    baseResource: "points",

    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        iteralPoints: new Decimal(0)
    }},
    type: "custom",
    baseAmount() {return player.points},
    getNextAt() {
        let nextAt = Decimal.pow(10, new Decimal(1e9).mul(Decimal.pow(10, player.i.points)))
        if (tmp.i.canBuyMax) nextAt = new Decimal(10).pow(new Decimal(1e9).mul(Decimal.pow(10, player.i.points.add(tmp.i.getResetGain))))
        return nextAt
    },
    getResetGain() {
        if (tmp[this.layer].canBuyMax) {
            return player.points.add(1).log(10).div(1e9).log(10).floor().sub(player.i.points).add(1).max(0)
        } else {
            return new Decimal(1)
        }
    },
    canReset() {
        if (tmp.i.canBuyMax) return player.points.gte(Decimal.pow(10, new Decimal(1e9).mul(Decimal.pow(10, player.i.points))))
        return player.points.gte(tmp[this.layer].getNextAt)
    },
    onPrestige() {
        if (!tmp.i.resetsNothing) player.i.iteralPoints = new Decimal(0)  
    },
    prestigeButtonText() {
        return `Reset for <b>+${formatWhole(tmp[this.layer].resetGain)}</b> iterations<br><br>
        ${format(player.points)}/${format(tmp[this.layer].nextAt)} points`
    },

    canBuyMax() {return hasMilestone("i", 3)},
    autoPrestige() {return hasMilestone('i', 6)},
    resetsNothing() {return hasMilestone('i', 6)},

    effect() {
        let effect = this.effectBase().mul(player[this.layer].points.pow(tmp.r.effect))
        return effect
    },
    effectBase() {
        let base = new Decimal(0.1)
        return base
    },
    effectDescription() {
        return `which increase the enhance point effect base by +${format(tmp[this.layer].effect)}`
    },
    iteralPointEffect() {
        let effect = player.i.iteralPoints.add(1).pow(0.75)
        return effect
    },
    iteralPointGen() {
        let gain = new Decimal(1)
        gain = gain.mul(Decimal.pow(tmp.i.iteralPointGenBase, player.i.points.pow(tmp.r.effect).sub(25)))
        return gain
    },
    iteralPointGenBase() {
        let base = new Decimal(1.5)
        if (hasUpgrade('a', 21)) base = base.mul(upgradeEffect('a', 21))
        return base
    },

    milestones: {
        0: {
            requirementDescription: "1 iteration",
            effectDescription: "Keep one enhance upgrade and an enhance point per iteration on reset",
            done() {return player.i.points.gte(1)},
            unlocked() {return true}
        },
        1: {
            requirementDescription: "4 iterations",
            effectDescription: "Unlock more enhance upgrades",
            done() {return player.i.points.gte(4)},
            unlocked() {return hasMilestone("i", 0)}
        },
        2: {
            requirementDescription: "9 iterations",
            effectDescription: "Passively generate x10 your enhance point gain per second",
            done() {return player.i.points.gte(9)},
            unlocked() {return hasMilestone("i", 1)}
        },
        3: {
            requirementDescription: "16 iterations",
            effectDescription: "You can buy max iterations",
            done() {return player.i.points.gte(16)},
            unlocked() {return hasMilestone("i", 2)}
        },
        4: {
            requirementDescription: "25 iterations",
            effectDescription: "Unlock iteral points",
            done() {return player.i.points.gte(25)},
            unlocked() {return hasMilestone("i", 3)}
        },
        5: {
            requirementDescription: "100 iterations",
            effectDescription: "Automatically earn enhancers whenever possible",
            done() {return player.i.points.gte(100)},
            unlocked() {return hasMilestone("i", 4)}
        },
        6: {
            requirementDescription: "121 iterations",
            effectDescription: "Automatically earn iterations whenever possible, and they no longer reset anything",
            done() {return player.i.points.gte(121)},
            unlocked() {return hasMilestone("i", 5)}
        }
    },

    doReset(resettingLayer) {
        let keep = ['milestones']
        let keptUpgrades = []

        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)

        player[this.layer].upgrades.push(...keptUpgrades)
        if (hasMilestone('a', 1)) player.i.points = player.i.points.add(player.a.points)
    },

    hotkeys: [
        {key: "i", description: "I: Reset for iterations", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        "milestones",
        ["display-text", () => {
            if (hasMilestone("i", 4)) return `You have ${format(player.i.iteralPoints)} iteral points (+${format(tmp.i.iteralPointGen)}/s), which multiply enhance point gain by x${format(tmp.i.iteralPointEffect)}`
        }],
        ["display-text", () => {
            if (hasMilestone("i", 4)) return `You are earning x${format(tmp.i.iteralPointGenBase)} more iteral points per iteration past 25`
        }]
    ],
    update(diff) {
        if (hasMilestone("i", 4)) player.i.iteralPoints = player.i.iteralPoints.add(tmp.i.iteralPointGen.mul(diff))
    },
    layerShown() {return hasUpgrade("e", 11) || player.i.unlocked},
})
addLayer("b", {
    name: "boost",
    symbol: "B",
    row: 1,
    position: 1,
    branches: ["e"],
    color: "#6e64c4",
    requires: new Decimal(1e42),
    resource: "boosters",
    baseResource: "enhance points",
    startData() {return {
        unlocked: false,
        points: new Decimal(0)
    }},
    type: "custom",
    baseAmount() {return player.e.points},
    getNextAt() {
        let nextAt = new Decimal(1e42).mul(Decimal.pow(100, player.b.points))
        if (tmp[this.layer].canBuyMax) nextAt = new Decimal(1e42).mul(Decimal.pow(100, player.b.points.add(tmp.b.getResetGain)))
        return nextAt
    },
    getResetGain() {
        if (tmp[this.layer].canBuyMax) {
            return player.e.points.div(1e42).add(1).log(100).floor().sub(player.b.points).add(1).max(0)
        } else {
            return new Decimal(1)
        }
    },
    canReset() {
        if (tmp[this.layer].canBuyMax) return player.e.points.gte(new Decimal(1e42).mul(Decimal.pow(100, player.b.points)))
        return player.e.points.gte(tmp[this.layer].getNextAt)
    },
    prestigeButtonText() {
        return `Reset for <b>+${formatWhole(tmp[this.layer].resetGain)}</b> boosters<br><br>
        ${format(player.e.points)}/${format(tmp[this.layer].nextAt)} enhance points`
    },

    canBuyMax() {return hasMilestone('b', 1)},
    autoPrestige() {return hasMilestone('b', 2)},
    resetsNothing() {return hasMilestone('b', 2)},

    effect() {
        let effect = Decimal.pow(tmp.b.effectBase, player.b.points.pow(tmp.sb.effect))
        return effect
    },
    effectBase() {
        let base = new Decimal(2)
        return base
    },
    effectDescription() {
        return `which are multiplying enhance point gain and the enhance point effect base by x${format(tmp[this.layer].effect)}`
    },
    
    milestones: {
        0: {
            requirementDescription: "5 boosters",
            effectDescription: "Keep all enhance upgrades on reset",
            done() {return player.b.points.gte(5)},
            unlocked() {return true}
        },
        1: {
            requirementDescription: "25 boosters",
            effectDescription: "You can buy max boosters",
            done() {return player.b.points.gte(25)},
            unlocked() {return hasMilestone('b', 0)}
        },
        2: {
            requirementDescription: "125 boosters",
            effectDescription: "Automatically earn boosters whenever possible, and they reset nothing",
            done() {return player.b.points.gte(125)},
            unlocked() {return hasMilestone('b', 1)}
        }
    },

    doReset(resettingLayer) {
        let keep = ['milestones']
        let keptUpgrades = []

        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)

        player[this.layer].upgrades.push(...keptUpgrades)

        if (hasMilestone('a', 1)) player.b.points = player.b.points.add(player.a.points)
    },

    hotkeys: [
        {key: "b", description: "B: Reset for boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    layerShown() {return player.i.unlocked || player.b.unlocked}
})
addLayer('a', {
    name: "augment",
    symbol: "A",
    row: 2,
    position: 1,
    branches: ["e"],
    color: "#9127bd",
    requires: new Decimal(1e100),
    resource: "augmented points",
    baseResource: "enhance points",
    startData() {return {
        unlocked: false,
        points: new Decimal(0),
        augmentEnergy: new Decimal(1)
    }},
    type: "custom",
    baseAmount() {return player.e.points},
    getNextAt() {
        let baseGain = tmp[this.layer].getResetGain.root(tmp[this.layer].gainExp).div(tmp[this.layer].gainMult)
        let nextAt = Decimal.pow(10, baseGain.add(1).root(0.33)).mul(1e99)
        return nextAt
    },
    getResetGain() {
        let base = player.e.points
        let gain = base.div(1e99).add(1).log(10).pow(0.33)
        return gain.mul(tmp[this.layer].gainMult).pow(tmp[this.layer].gainExp).floor()
    },
    canReset() {
        return player.e.points.gte(tmp[this.layer].requires)
    },
    prestigeButtonText() {
        return `Reset for <b>+${formatWhole(tmp[this.layer].resetGain)}</b> augmented points<br><br>
        Next at ${format(tmp[this.layer].nextAt)} enhance points`
    },
    onPrestige() {
        player.a.augmentEnergy = new Decimal(1)
    },

    passiveGeneration() {if (hasUpgrade('a', 23)) return new Decimal(1)},

    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() {
        let exp = new Decimal(1)
        exp = exp.mul(tmp.n.effect)
        return exp
    },

    augmentEnergyGen() {
        let gen = new Decimal(1)
        gen = gen.mul(Decimal.pow(tmp.a.augmentEnergyGenBase, player.a.points))
        if (hasUpgrade('a', 11)) gen = gen.pow(upgradeEffect('a', 11))
        return gen
    },
    augmentEnergyGenBase() {
        let base = new Decimal(1.1)
        return base
    },
    augmentEnergyEffect() {
        let effect = player.a.augmentEnergy.pow(0.5)
        return effect
    },

    upgrades: {
        11: {
            title: "Begin The Augmentation?",
            description() {return "Augmented energy generation is faster based on augmented points. Effect: ^" + format(this.effect())},
            cost: new Decimal(100),
            effect() {
                let effect = player.a.points.add(1).log(10).pow(1.1).add(1)
                return effect
            },
            unlocked() {return true}
        },
        12: {
            title: "Iterated Enhancers",
            description() {return "Iterator effect also increases the enhancer effect base. Effect: +" + format(this.effect())},
            cost: new Decimal(250),
            effect() {
                let effect = tmp.i.effect
                return effect
            },
            unlocked() {return hasUpgrade('a', 11)}
        },
        13: {
            title: "Enhanced Powerups",
            description() {return "Raise enhance point gain to the power of ^1.5."},
            cost: new Decimal(1000),
            unlocked() {return hasUpgrade('a', 12)}
        },
        21: {
            title: "Burning Ship",
            description() {return "Augmented points multipliy the iteration point multi per iteration. Effect: x" + format(this.effect())},
            cost: new Decimal(1e10),
            effect() {
                let effect = player.a.points.add(1).log(10).add(1)
                return effect
            },
            unlocked() {return hasUpgrade('a', 13)}
        },
        22: {
            title: "Real Augmentation",
            description() {return "Unlock Augmenters."},
            cost: new Decimal(1e100),
            unlocked() {return hasUpgrade('a', 21)}
        },
        23: {
            title: "Automentation",
            description() {return "Passively earn augmenters and augmented points every tick. Effect: +" + format(this.effect()) + " augmenters/sec"},
            cost: new Decimal("ee10"),
            effect() {
                let effect = player.a.points.add(1).log(10).add(1)
                return effect
            },
            unlocked() {return hasUpgrade('a', 22)}
        }
    },

    buyables: {
        11: {
            title() {return "Augmenters (" + formatWhole(getBuyableAmount(this.layer, this.id)) + ")"},
            cost(x) {
                let costBase = new Decimal(1)
                let costScaling = new Decimal(1e100)
                let costSoftcapStart = this.softcapStart()
                let costSoftcapScaling = this.softcapScaling()
                let cost = costBase.mul(costScaling.pow(x))
                if (x.gte(costSoftcapStart)) cost = costBase.mul(costScaling.pow(x.sub(100).mul(costSoftcapScaling).add(100)))
                return cost
            },
            softcapStart() {
                let start = new Decimal(100)
                return start
            },
            softcapScaling() {
                let scaling = new Decimal(100)
                return scaling
            },
            display() {return `Multiplying enhance point gain exponent by x${format(this.effectBase())} each
                Currently: ^${format(this.effect())}
                Cost: ${format(this.cost())} augmented points ${getBuyableAmount(this.layer, this.id).gte(this.softcapStart()) ? "<br><b style='color: #ff0000'>[SOFTCAPPED]</b>" : ""}`
            },
            effect() {
                let effect = this.effectBase().pow(getBuyableAmount(this.layer, this.id).pow(tmp.sb.effect))
                return effect
            },
            effectBase() {
                let base = new Decimal(3)
                return base
            },
            canAfford() {return player[this.layer].points.gte(this.cost())},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {return hasUpgrade("a", 22)},
        }
    },

    milestones: {
        0: {
            requirementDescription: "7 augmented points",
            effectDescription: "Start resets with enhance points amd enhancers equal to your current augmented point amount",
            done() {return player.a.points.gte(7)},
            unlocked() {return true}
        },
        1: {
            requirementDescription: "49 augmented points",
            effectDescription: "Start resets with iterations and boosters equal to your current augmented point amount",
            done() {return player.a.points.gte(49)},
            unlocked() {return hasMilestone('a', 0)}
        }
    },

    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        "milestones",
        ["display-text", () => {
            return `You have ${format(player.a.augmentEnergy)} augment energy (x${format(tmp.a.augmentEnergyGen)}/s), which multiply enhance point gain by x${format(tmp.a.augmentEnergyEffect)}`
        }],
        ["display-text", () => {
            return `You are earning x${format(tmp.a.augmentEnergyGenBase)} more augment energy per augmented point`
        }],
        "blank",
        "buyables",
        "blank",
        "upgrades"
    ],

    hotkeys: [
        {key: "a", description: "A: Reset for augmented points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    
    update(diff) {
        player.a.augmentEnergy = player.a.augmentEnergy.mul(tmp.a.augmentEnergyGen.pow(diff))
        if (hasUpgrade('a', 23)) setBuyableAmount('a', 11, getBuyableAmount('a', 11).add(upgradeEffect('a', 23)))
    },

    doReset(resettingLayer) {
        let keep = ['milestones']
        let keptUpgrades = []

        if (player.n.points.gte(1)) keptUpgrades.push(11)
        if (player.n.points.gte(2)) keptUpgrades.push(12)
        if (player.n.points.gte(3)) keptUpgrades.push(13)
        if (player.n.points.gte(4)) keptUpgrades.push(21)
        if (player.n.points.gte(5)) keptUpgrades.push(22)
        if (player.n.points.gte(6)) keptUpgrades.push(23)

        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)

        player[this.layer].upgrades.push(...keptUpgrades)
        if (hasMilestone('n', 0)) player.a.points = player.a.points.add(player.n.points)

    },

    layerShown() {return player.b.unlocked || player.a.unlocked}
})
addLayer("r", {
    name: "recursions",
    symbol: "R",
    row: 2,
    position: 0,
    branches: ["i"],
    color: "#9c65b7",
    requires: new Decimal("1e1000"),
    resource: "recursions",
    baseResource: "iterations",

    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    type: "custom",
    baseAmount() {return player.i.points},
    getNextAt() {
        let nextAt = Decimal.pow(10, new Decimal(1000).mul(Decimal.pow(10, player.r.points)))
        if (tmp.r.canBuyMax) nextAt = Decimal.pow(10, new Decimal(1000).mul(Decimal.pow(10, player.r.points.add(tmp.r.getResetGain))))
        return nextAt
    },
    getResetGain() {
        if (tmp[this.layer].canBuyMax) {
            return player.i.points.add(1).log(10).div(1000).log(10).floor().sub(player.r.points).add(1).max(0)
        } else {
            return new Decimal(1)
        }
    },
    canReset() {
        if (tmp.r.canBuyMax) return player.i.points.gte(Decimal.pow(10, new Decimal(1000).mul(Decimal.pow(10, player.r.points))))
        return player.i.points.gte(tmp[this.layer].getNextAt)
    },
    onPrestige() {

    },
    prestigeButtonText() {
        return `Reset for <b>+${formatWhole(tmp[this.layer].resetGain)}</b> recursions<br><br>
        ${format(player.i.points)}/${format(tmp[this.layer].nextAt)} iterations`
    },

    canBuyMax() {return hasMilestone('r', 0)},
    autoPrestige() {return hasMilestone('r', 0)},
    resetsNothing() {return hasMilestone('r', 0)},

    effect() {
        let effect = this.effectBase().mul(player[this.layer].points).add(1)
        return effect
    },
    effectBase() {
        let base = new Decimal(0.01)
        return base
    },
    effectDescription() {
        return `which raise effective iterations to the power of ^${format(tmp[this.layer].effect)}`
    },

    milestones: {
        0: {
            requirementDescription: "10 recursions",
            effectDescription: "Fully automate recursions",
            done() {return player.r.points.gte(10)},
            unlocked() {return true}
        },
    },

    doReset(resettingLayer) {
        let keep = ['milestones']
        let keptUpgrades = []

        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)

        player[this.layer].upgrades.push(...keptUpgrades)
    },

    hotkeys: [
        {key: "R", description: "R: Reset for recursions", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        "milestones",
        ["display-text", () => {
        }],
        ["display-text", () => {
        }]
    ],
    update(diff) {
    },
    layerShown() {return player.a.unlocked || player.r.unlocked},
})
addLayer("sb", {
    name: "super boost",
    symbol: "SB",
    row: 2,
    position: 2,
    branches: ["b"],
    color: "#504899",
    requires: new Decimal("e1e100"),
    resource: "super boosters",
    baseResource: "boosters",
    startData() {return {
        unlocked: false,
        points: new Decimal(0)
    }},
    type: "custom",
    baseAmount() {return player.b.points},
    getNextAt() {
        let nextAt = Decimal.pow(10, Decimal.pow(10, Decimal.pow(10, player.sb.points.add(2))))
        if (tmp[this.layer].canBuyMax) nextAt = Decimal.pow(10, Decimal.pow(10, Decimal.pow(10, player.sb.points.add(tmp[this.layer].getResetGain).add(2))))
        return nextAt
    },
    getResetGain() {
        if (tmp[this.layer].canBuyMax) {
            return player.b.points.add(1).log(10).add(1).log(10).add(1).log(10).sub(2).floor().sub(player.sb.points).add(1).max(0)
        } else {
            return new Decimal(1)
        }
    },
    canReset() {
        if (tmp[this.layer].canBuyMax) return player.b.points.gte(Decimal.pow(10, Decimal.pow(10, Decimal.pow(10, player.sb.points.add(2)))))
        return player.b.points.gte(tmp[this.layer].getNextAt)
    },
    prestigeButtonText() {
        return `Reset for <b>+${formatWhole(tmp[this.layer].resetGain)}</b> super boosters<br><br>
        ${format(player.b.points)}/${format(tmp[this.layer].nextAt)} boosters`
    },

    canBuyMax() {return hasMilestone('sb', 0)},
    autoPrestige() {return hasMilestone('sb', 1)},
    resetsNothing() {return hasMilestone('sb', 1)},

    effect() {
        let effect = Decimal.pow(tmp.b.effectBase, player.sb.points.pow(tmp.n.effect)).div(100).add(0.99)
        if (player.sb.points.eq(new Decimal(0))) effect = new Decimal(1)
        return effect
    },
    effectBase() {
        let base = new Decimal(2)
        return base
    },
    effectDescription() {
        return `which are raising effective boosters and augmenters to the power of ${format(tmp.sb.effect)}`
    },
    
    milestones: {
        0: {
            requirementDescription: "10 super boosters",
            effectDescription: "You can buy max super boosters",
            done() {return player.sb.points.gte(10)},
            unlocked() {return true}
        },
        1: {
            requirementDescription: "1.00e10 super boosters",
            effectDescription: "Fully automate super boosters",
            done() {return player.sb.points.gte(1e10)},
            unlocked() {return hasMilestone('sb', 0)}
        },
    },

    doReset(resettingLayer) {
        let keep = ['milestones']
        let keptUpgrades = []

        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)

        player[this.layer].upgrades.push(...keptUpgrades)
    },

    hotkeys: [
        {key: "B", description: "Shift+B: Reset for super boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    layerShown() {return player.r.unlocked || player.sb.unlocked}
})
addLayer("n", {
    name: "intensify",
    symbol: "N",
    row: 3,
    position: 0,
    branches: ["a"],
    color: "#6c1db7",
    requires: new Decimal("eee1e102"),
    resource: "intensifiers",
    baseResource: "augmented points",
    startData() {return {
        unlocked: false,
        points: new Decimal(0),
        resetTime: 0,
        intensifiedPoints: new Decimal(1),
        intensifiedDimensions: [new Decimal(2), new Decimal(2), new Decimal(2), new Decimal(2), new Decimal(2), new Decimal(2), new Decimal(2), new Decimal(2), new Decimal(2)],
        ID4Exp: new Decimal(1),
        ID7Exp: new Decimal(1)
    }},
    type: "custom",
    baseAmount() {return player.a.points},
    getNextAt() {
        let nextAt = Decimal.tetrate(1e100, player.n.points.pow(0.66).add(4))
        if (tmp[this.layer].canBuyMax) nextAt = Decimal.tetrate(1e100, player.n.points.add(tmp[this.layer].resetGain).pow(0.66).add(4))
        return nextAt
    },
    getResetGain() {
        if (tmp[this.layer].canBuyMax) {
            return player.a.points.add(1).slog(1e100).sub(4).root(0.66).sub(player.n.points).max(0)
        } else {
            return new Decimal(1)
        }
    },
    canReset() {
        if (tmp[this.layer].canBuyMax) return player.a.points.gte(Decimal.tetrate(1e100, player.n.points.pow(0.66).add(4)))
        return player.a.points.gte(tmp[this.layer].getNextAt)
    },
    prestigeButtonText() {
        return `Reset for <b>+${formatWhole(tmp[this.layer].resetGain)}</b> intensifiers<br><br>
        ${format(player.a.points)}/${format(tmp[this.layer].nextAt)} augmented points`
    },

    canBuyMax() {return hasMilestone('n', 11)},
    autoPrestige() {return hasMilestone('n', 11)},
    resetsNothing() {return hasMilestone('n', 11)},

    effect() {
        let effect = player.n.points.pow(player.n.intensifiedPoints).pow(0.5).add(1)
        if (hasUpgrade('n', 33)) effect = player.n.points.pow(Decimal.pow(9, player.n.intensifiedPoints)).pow(0.5).add(1)
        return effect
    },
    effectDescription() {
        return `which are raising augmented point gain and effective super boosters to the power of ^${format(tmp[this.layer].effect)}`
    },

    allIDsExponent() {
        let exp = new Decimal(1)
        if (hasUpgrade('n', 11)) exp = exp.mul(upgradeEffect('n', 11))
        return exp
    },
    
    milestones: {
        0: {
            requirementDescription: "1 intensifier",
            effectDescription: "Keep one augmented point and augmented point upgrade per intensifier on reset",
            done() {return player.n.points.gte(1)},
            unlocked() {return true}
        },
        1: {
            requirementDescription: "2 intensifiers",
            effectDescription: "Unlock intensified points and intensified dimension I",
            done() {return player.n.points.gte(2)},
            unlocked() {return hasMilestone('n', 0)}
        },
        2: {
            requirementDescription: "3 intensifiers",
            effectDescription: "Unlock intense upgrades and intensified dimension II",
            done() {return player.n.points.gte(3)},
            unlocked() {return hasMilestone('n', 1)}
        },
        3: {
            requirementDescription: "4 intensifiers",
            effectDescription: "Unlock intensified dimension III",
            done() {return player.n.points.gte(4)},
            unlocked() {return hasMilestone('n', 2)}
        },
        4: {
            requirementDescription: "5 intensifiers",
            effectDescription: "Unlock intensified dimension IV, this one works a bit differently...",
            done() {return player.n.points.gte(5)},
            unlocked() {return hasMilestone('n', 3)}
        },
        5: {
            requirementDescription: "6 intensifiers",
            effectDescription: "Unlock intensified dimension V, and auto buy max row 1 intensifed dimensions",
            done() {return player.n.points.gte(6)},
            unlocked() {return hasMilestone('n', 4)}
        },
        6: {
            requirementDescription: "7 intensifiers",
            effectDescription: "Unlock intensified dimension VI",
            done() {return player.n.points.gte(7)},
            unlocked() {return hasMilestone('n', 5)}
        },
        7: {
            requirementDescription: "9 intensifiers",
            effectDescription: "Unlock intensified dimension VII",
            done() {return player.n.points.gte(9)},
            unlocked() {return hasMilestone('n', 6)}

        },
        8: {
            requirementDescription: "12 intensifiers",
            effectDescription: "Unlock intensified dimension VIII, and auto buy max row 2 intensified dimensions",
            done() {return player.n.points.gte(12)},
            unlocked() {return hasMilestone('n', 7)}
        },
        9: {
            requirementDescription: "16 intensifiers",
            effectDescription: "Unlock intensified dimension IX",
            done() {return player.n.points.gte(16)},
            unlocked() {return hasMilestone('n', 8)}
        },
        10: {
            requirementDescription: "24 intensifiers",
            effectDescription: "Tetrate point gain by 2",
            done() {return player.n.points.gte(24)},
            unlocked() {return hasMilestone('n', 9)}
        },
        11: {
            requirementDescription: "100 intensifiers",
            effectDescription: "Fully automate intensifiers",
            done() {return player.n.points.gte(100)},
            unlocked() {return hasMilestone('n', 10)}
        }
    },

    buyables: {
        11: {
            title() {return "Intensified Dimension I (x" + format(player.n.intensifiedDimensions[0]) + ") (" + formatWhole(getBuyableAmount(this.layer, this.id)) + ")"},
            cost(x) {
                let costBase = new Decimal(1)
                let costScaling = new Decimal(10)
                let cost = Decimal.pow(10, costBase.mul(costScaling.pow(x)))
                return cost
            },
            display() {return `Multiplying intensified points by x${format(player.n.intensifiedDimensions[0].pow(buyableEffect(this.layer, this.id)))} per second
                Buying this will raise the above effect to the power of ^${format(this.effectBase())} per purchase
                Currently: ^${format(this.effect())}
                Cost: ${format(this.cost())} intensified points`
            },
            effect() {
                let effect = this.effectBase().pow(getBuyableAmount(this.layer, this.id)).mul(tmp.n.allIDsExponent)
                if (hasUpgrade('n', 13)) effect = effect.mul(upgradeEffect('n', 13))
                if (player.n.points.gte(5)) effect = effect.mul(player.n.ID4Exp)
                return effect
            },
            effectBase() {
                let base = new Decimal(2)
                if (hasUpgrade('n', 12)) base = base.add(upgradeEffect('n', 12))
                if (hasUpgrade('n', 14)) base = base.add(upgradeEffect('n', 14))
                if (hasUpgrade('n', 22)) base = base.mul(upgradeEffect('n', 22))
                if (hasUpgrade('n', 24)) base = base.mul(upgradeEffect('n', 24))
                return base
            },
            canAfford() {return player.n.intensifiedPoints.gte(this.cost())},
            buy() {
                player.n.intensifiedPoints = player.n.intensifiedPoints.div(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {return hasMilestone("n", 1)},
        },
        12: {
            title() {return "Intensified Dimension II (x" + format(player.n.intensifiedDimensions[1]) + ") (" + formatWhole(getBuyableAmount(this.layer, this.id)) + ")"},
            cost(x) {
                let costBase = new Decimal(10)
                let costScaling = new Decimal(100)
                let cost = Decimal.pow(10, costBase.mul(costScaling.pow(x)))
                return cost
            },
            display() {return `Multiplying intensified dimension I by x${format(player.n.intensifiedDimensions[1].pow(buyableEffect(this.layer, this.id)))} per second
                Buying this will raise the above effect to the power of ^${format(this.effectBase())} per purchase
                Currently: ^${format(this.effect())}
                Cost: ${format(this.cost())} intensified points`
            },
            effect() {
                let effect = this.effectBase().pow(getBuyableAmount(this.layer, this.id)).mul(tmp.n.allIDsExponent)
                if (player.n.points.gte(5)) effect = effect.mul(player.n.ID4Exp)
                return effect
            },
            effectBase() {
                let base = new Decimal(2)
                if (hasUpgrade('n', 12)) base = base.add(upgradeEffect('n', 12))
                if (hasUpgrade('n', 14)) base = base.add(upgradeEffect('n', 14))
                if (hasUpgrade('n', 22)) base = base.mul(upgradeEffect('n', 22))
                if (hasUpgrade('n', 24)) base = base.mul(upgradeEffect('n', 24))
                return base
            },
            canAfford() {return player.n.intensifiedPoints.gte(this.cost())},
            buy() {
                player.n.intensifiedPoints = player.n.intensifiedPoints.div(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {return hasMilestone('n', 2)},
        },
        13: {
            title() {return "Intensified Dimension III (x" + format(player.n.intensifiedDimensions[2]) + ") (" + formatWhole(getBuyableAmount(this.layer, this.id)) + ")"},
            cost(x) {
                let costBase = new Decimal(1e9)
                let costScaling = new Decimal(1000)
                let cost = Decimal.pow(10, costBase.mul(costScaling.pow(x)))
                return cost
            },
            display() {return `Multiplying intensified dimension II by x${format(player.n.intensifiedDimensions[2].pow(buyableEffect(this.layer, this.id)))} per second
                Buying this will raise the above effect to the power of ^${format(this.effectBase())} per purchase
                Currently: ^${format(this.effect())}
                Cost: ${format(this.cost())} intensified points`
            },
            effect() {
                let effect = this.effectBase().pow(getBuyableAmount(this.layer, this.id)).mul(tmp.n.allIDsExponent)
                if (hasMilestone('n', 4)) effect = effect.mul(player.n.ID4Exp)
                return effect
            },
            effectBase() {
                let base = new Decimal(2)
                if (hasUpgrade('n', 12)) base = base.add(upgradeEffect('n', 12))
                if (hasUpgrade('n', 14)) base = base.add(upgradeEffect('n', 14))
                if (hasUpgrade('n', 22)) base = base.mul(upgradeEffect('n', 22))
                if (hasUpgrade('n', 24)) base = base.mul(upgradeEffect('n', 24))
                return base
            },
            canAfford() {return player.n.intensifiedPoints.gte(this.cost())},
            buy() {
                player.n.intensifiedPoints = player.n.intensifiedPoints.div(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {return hasMilestone('n', 3)},
        },
        21: {
            title() {return "Intensified Dimension IV (x" + format(player.n.intensifiedDimensions[3]) + ") (" + formatWhole(getBuyableAmount(this.layer, this.id)) + ")"},
            cost(x) {
                let cost = Decimal.pow(10, Decimal.pow(10, Decimal.pow(100, x).mul(50)))
                return cost
            },
            display() {return `Multiplying intensified dimension III and the exponents of the above 3 buyables by x${format(player.n.intensifiedDimensions[3].pow(buyableEffect(this.layer, this.id)))} per second
                Buying this will raise the above effect to the power of ^${format(this.effectBase())} per purchase
                Currently: ^${format(this.effect())}
                Cost: ${format(this.cost())} intensified points`
            },
            effect() {
                let effect = this.effectBase().pow(getBuyableAmount(this.layer, this.id)).mul(tmp.n.allIDsExponent)
                if (hasUpgrade('n', 21)) effect = effect.mul(upgradeEffect('n', 21))
                if (hasMilestone('n', 7)) effect = effect.mul(player.n.ID7Exp)
                return effect
            },
            effectBase() {
                let base = new Decimal(2)
                if (hasUpgrade('n', 12)) base = base.add(upgradeEffect('n', 12))
                if (hasUpgrade('n', 14)) base = base.add(upgradeEffect('n', 14))
                if (hasUpgrade('n', 22)) base = base.mul(upgradeEffect('n', 22))
                if (hasUpgrade('n', 24)) base = base.mul(upgradeEffect('n', 24))
                return base
            },
            canAfford() {return player.n.intensifiedPoints.gte(this.cost())},
            buy() {
                player.n.intensifiedPoints = player.n.intensifiedPoints.div(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {return hasMilestone('n', 4)},
        },
        22: {
            title() {return "Intensified Dimension V (x" + format(player.n.intensifiedDimensions[4]) + ") (" + formatWhole(getBuyableAmount(this.layer, this.id)) + ")"},
            cost(x) {
                let cost = Decimal.pow(10, Decimal.pow(10, Decimal.pow(1000, x).mul(100)))
                return cost
            },
            display() {return `Multiplying intensified dimension IV by x${format(player.n.intensifiedDimensions[4].pow(buyableEffect(this.layer, this.id)))} per second
                Buying this will raise the above effect to the power of ^${format(this.effectBase())} per purchase
                Currently: ^${format(this.effect())}
                Cost: ${format(this.cost())} intensified points`
            },
            effect() {
                let effect = this.effectBase().pow(getBuyableAmount(this.layer, this.id)).mul(tmp.n.allIDsExponent)
                if (hasMilestone('n', 7)) effect = effect.mul(player.n.ID7Exp)
                return effect
            },
            effectBase() {
                let base = new Decimal(2)
                if (hasUpgrade('n', 12)) base = base.add(upgradeEffect('n', 12))
                if (hasUpgrade('n', 14)) base = base.add(upgradeEffect('n', 14))
                if (hasUpgrade('n', 22)) base = base.mul(upgradeEffect('n', 22))
                if (hasUpgrade('n', 24)) base = base.mul(upgradeEffect('n', 24))
                return base
            },
            canAfford() {return player.n.intensifiedPoints.gte(this.cost())},
            buy() {
                player.n.intensifiedPoints = player.n.intensifiedPoints.div(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {return hasMilestone('n', 5)},
        },
        23: {
            title() {return "Intensified Dimension VI (x" + format(player.n.intensifiedDimensions[5]) + ") (" + formatWhole(getBuyableAmount(this.layer, this.id)) + ")"},
            cost(x) {
                let cost = Decimal.pow(10, Decimal.pow(10, Decimal.pow(10000, x).mul(1e42)))
                return cost
            },
            display() {return `Multiplying intensified dimension V by x${format(player.n.intensifiedDimensions[5].pow(buyableEffect(this.layer, this.id)))} per second
                Buying this will raise the above effect to the power of ^${format(this.effectBase())} per purchase
                Currently: ^${format(this.effect())}
                Cost: ${format(this.cost())} intensified points`
            },
            effect() {
                let effect = this.effectBase().pow(getBuyableAmount(this.layer, this.id)).mul(tmp.n.allIDsExponent)
                if (hasMilestone('n', 7)) effect = effect.mul(player.n.ID7Exp)
                return effect
            },
            effectBase() {
                let base = new Decimal(2)
                if (hasUpgrade('n', 12)) base = base.add(upgradeEffect('n', 12))
                if (hasUpgrade('n', 14)) base = base.add(upgradeEffect('n', 14))
                if (hasUpgrade('n', 22)) base = base.mul(upgradeEffect('n', 22))
                if (hasUpgrade('n', 24)) base = base.mul(upgradeEffect('n', 24))
                return base
            },
            canAfford() {return player.n.intensifiedPoints.gte(this.cost())},
            buy() {
                player.n.intensifiedPoints = player.n.intensifiedPoints.div(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {return hasMilestone('n', 6)},
        },
        31: {
            title() {return "Intensified Dimension VII (x" + format(player.n.intensifiedDimensions[6]) + ") (" + formatWhole(getBuyableAmount(this.layer, this.id)) + ")"},
            cost(x) {
                let cost = Decimal.pow(10, Decimal.pow(10, Decimal.pow(10, Decimal.pow(11, x).mul(100))))
                return cost
            },
            display() {return `Multiplying intensified dimension VI and the exponents of the above 3 buyables by x${format(player.n.intensifiedDimensions[6].pow(buyableEffect(this.layer, this.id)))} per second
                Buying this will raise the above effect to the power of ^${format(this.effectBase())} per purchase
                Currently: ^${format(this.effect())}
                Cost: ${format(this.cost())} intensified points`
            },
            effect() {
                let effect = this.effectBase().pow(getBuyableAmount(this.layer, this.id)).mul(tmp.n.allIDsExponent)
                if (hasUpgrade('n', 32)) effect = this.effectBase().pow(getBuyableAmount(this.layer, this.id).pow(8)).mul(tmp.n.allIDsExponent)
                if (hasUpgrade('n', 23)) effect = effect.pow(upgradeEffect('n', 23))
                if (hasUpgrade('n', 31)) effect = effect.pow(7)
                return effect
            },
            effectBase() {
                let base = new Decimal(2)
                if (hasUpgrade('n', 12)) base = base.add(upgradeEffect('n', 12))
                if (hasUpgrade('n', 14)) base = base.add(upgradeEffect('n', 14))
                if (hasUpgrade('n', 22)) base = base.mul(upgradeEffect('n', 22))
                if (hasUpgrade('n', 24)) base = base.mul(upgradeEffect('n', 24))
                return base
            },
            canAfford() {return player.n.intensifiedPoints.gte(this.cost())},
            buy() {
                player.n.intensifiedPoints = player.n.intensifiedPoints.div(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {return hasMilestone('n', 7)},
        },
        32: {
            title() {return "Intensified Dimension VIII (x" + format(player.n.intensifiedDimensions[7]) + ") (" + formatWhole(getBuyableAmount(this.layer, this.id)) + ")"},
            cost(x) {
                let cost = Decimal.pow(10, Decimal.pow(10, Decimal.pow(10, Decimal.pow(10, Decimal.pow(10, x.add(2))))))
                return cost
            },
            display() {return `Multiplying intensified dimension VII by x${format(player.n.intensifiedDimensions[7].pow(buyableEffect(this.layer, this.id)))} per second
                Buying this will raise the above effect to the power of ^${format(this.effectBase())} per purchase
                Currently: ^${format(this.effect())}
                Cost: ${format(this.cost())} intensified points`
            },
            effect() {
                let effect = this.effectBase().pow(getBuyableAmount(this.layer, this.id)).mul(tmp.n.allIDsExponent)
                if (hasUpgrade('n', 33)) effect = this.effectBase().pow(getBuyableAmount(this.layer, this.id).pow(9)).mul(tmp.n.allIDsExponent)
                return effect
            },
            effectBase() {
                let base = new Decimal(2)
                if (hasUpgrade('n', 12)) base = base.add(upgradeEffect('n', 12))
                if (hasUpgrade('n', 14)) base = base.add(upgradeEffect('n', 14))
                if (hasUpgrade('n', 22)) base = base.mul(upgradeEffect('n', 22))
                if (hasUpgrade('n', 24)) base = base.mul(upgradeEffect('n', 24))
                return base
            },
            canAfford() {return player.n.intensifiedPoints.gte(this.cost())},
            buy() {
                player.n.intensifiedPoints = player.n.intensifiedPoints.div(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {return hasMilestone('n', 8)},
        },
        33: {
            title() {return "Intensified Dimension IX (x" + format(player.n.intensifiedDimensions[8]) + ") (" + formatWhole(getBuyableAmount(this.layer, this.id)) + ")"},
            cost(x) {
                let cost = Decimal.pow(10, Decimal.pow(10, Decimal.pow(10, Decimal.pow(10, Decimal.pow(10, Decimal.pow(10, x.add(3)))))))
                return cost
            },
            display() {return `Multiplying intensified dimension VIII by x${format(player.n.intensifiedDimensions[8].pow(buyableEffect(this.layer, this.id)))} per second
                Buying this will raise the above effect to the power of ^${format(this.effectBase())} per purchase
                Currently: ^${format(this.effect())}
                Cost: ${format(this.cost())} intensified points`
            },
            effect() {
                let effect = this.effectBase().pow(getBuyableAmount(this.layer, this.id)).mul(tmp.n.allIDsExponent)
                return effect
            },
            effectBase() {
                let base = new Decimal(2)
                if (hasUpgrade('n', 12)) base = base.add(upgradeEffect('n', 12))
                if (hasUpgrade('n', 14)) base = base.add(upgradeEffect('n', 14))
                if (hasUpgrade('n', 22)) base = base.mul(upgradeEffect('n', 22))
                if (hasUpgrade('n', 24)) base = base.mul(upgradeEffect('n', 24))
                return base
            },
            canAfford() {return player.n.intensifiedPoints.gte(this.cost())},
            buy() {
                player.n.intensifiedPoints = player.n.intensifiedPoints.div(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {return hasMilestone('n', 9)},
        },
    },

    upgrades: {
        11: {
            title: "Not That Intense",
            description() {return "Earn an exponent to all intensified dimensions based on points. Effect: ^" + format(this.effect())},
            cost: new Decimal("e1000000"),
            effect() {
                let effect = player.points.add(1).slog(10).add(1)
                return effect
            },
            canAfford() {return player.n.intensifiedPoints.gte(this.cost)},
            pay() {player.n.intensifiedPoints = player.n.intensifiedPoints.div(this.cost)},
            currencyLayer: 'n',
            currencyInternalName: 'intensifiedPoints',
            currencyDisplayName:'intensified points',
            unlocked() {return hasMilestone('n', 2)}
        },
        12: {
            title: "Enhance Dimensions",
            description() {return "Increase the intensified dimension purchase exponent based on enhance points. Effect: +" + format(this.effect())},
            cost: new Decimal("e1e12"),
            effect() {
                let effect = player.e.points.add(1).slog(10).div(10)
                return effect
            },
            canAfford() {return player.n.intensifiedPoints.gte(this.cost)},
            pay() {player.n.intensifiedPoints = player.n.intensifiedPoints.div(this.cost)},
            currencyLayer: 'n',
            currencyInternalName: 'intensifiedPoints',
            currencyDisplayName:'intensified points',
            unlocked() {return hasUpgrade('n', 11)}
        },
        13: {
            title: "Iterated Tension",
            description() {return "Earn an exponent to Intensified Dimension I based on iterations. Effect: ^" + format(this.effect())},
            cost: new Decimal("e1e18"),
            effect() {
                let effect = player.i.points.add(1).slog(10).pow(7).add(1)
                return effect
            },
            canAfford() {return player.n.intensifiedPoints.gte(this.cost)},
            pay() {player.n.intensifiedPoints = player.n.intensifiedPoints.div(this.cost)},
            currencyLayer: 'n',
            currencyInternalName: 'intensifiedPoints',
            currencyDisplayName:'intensified points',
            unlocked() {return hasUpgrade('n', 12)}
        },
        14: {
            title: "Need More Boosts",
            description() {return "Increase the intensified dimension purchase exponent based on boosters. Effect: +" + format(this.effect())},
            cost: new Decimal("e1e30"),
            effect() {
                let effect = player.b.points.add(1).slog(10).pow(0.2)
                return effect
            },
            canAfford() {return player.n.intensifiedPoints.gte(this.cost)},
            pay() {player.n.intensifiedPoints = player.n.intensifiedPoints.div(this.cost)},
            currencyLayer: 'n',
            currencyInternalName: 'intensifiedPoints',
            currencyDisplayName:'intensified points',
            unlocked() {return hasUpgrade('n', 13)}
        },
        21: {
            title: "Augmented Growth",
            description() {return "Earn an exponent to Intensified Dimension IV based on augmented points. Effect: ^" + format(this.effect())},
            cost: new Decimal("e1e1000"),
            effect() {
                let effect = player.a.points.add(1).slog(10).mul(100).add(1)
                return effect
            },
            canAfford() {return player.n.intensifiedPoints.gte(this.cost)},
            pay() {player.n.intensifiedPoints = player.n.intensifiedPoints.div(this.cost)},
            currencyLayer: 'n',
            currencyInternalName: 'intensifiedPoints',
            currencyDisplayName:'intensified points',
            unlocked() {return hasUpgrade('n', 14)}
        },
        22: {
            title: "Erin E. Hansen",
            description() {return "Multiply intensified dimension purchase exponents based on recursions. Effect: x" + format(this.effect())},
            cost: new Decimal("ee1e12"),
            effect() {
                let effect = player.r.points.add(1).slog(10).add(1).log(2.5).max(1)
                return effect
            },
            canAfford() {return player.n.intensifiedPoints.gte(this.cost)},
            pay() {player.n.intensifiedPoints = player.n.intensifiedPoints.div(this.cost)},
            currencyLayer: 'n',
            currencyInternalName: 'intensifiedPoints',
            currencyDisplayName:'intensified points',
            unlocked() {return hasUpgrade('n', 21)}
        },
        23: {
            title: "Superior Empowerment",
            description() {return "Earn an exponent to Intensified Dimension VII's exponent based on super boosters. Effect: ^" + format(this.effect())},
            cost: new Decimal("eee1000000"),
            effect() {
                let effect = player.sb.points.add(1).slog(10).add(1).log(3).add(1)
                return effect
            },
            canAfford() {return player.n.intensifiedPoints.gte(this.cost)},
            pay() {player.n.intensifiedPoints = player.n.intensifiedPoints.div(this.cost)},
            currencyLayer: 'n',
            currencyInternalName: 'intensifiedPoints',
            currencyDisplayName:'intensified points',
            unlocked() {return hasUpgrade('n', 22)}
        },
        24: {
            title: "Ultimately Intensified",
            description() {return "Intensifiers directly translate to a multiplier to intensified dimension purchase exponents. Effect: x" + format(this.effect())},
            cost: new Decimal("eeee2500"),
            effect() {
                let effect = player.n.points.add(1)
                return effect
            },
            canAfford() {return player.n.intensifiedPoints.gte(this.cost)},
            pay() {player.n.intensifiedPoints = player.n.intensifiedPoints.div(this.cost)},
            currencyLayer: 'n',
            currencyInternalName: 'intensifiedPoints',
            currencyDisplayName:'intensified points',
            unlocked() {return hasUpgrade('n', 23)}
        },
        31: {
            title: "Lucky Seven",
            description() {return "Auto buy max Intensified Dimension VII and raise its exponent to the power of ^7."},
            cost: new Decimal("eeee10000"),
            canAfford() {return player.n.intensifiedPoints.gte(this.cost)},
            pay() {player.n.intensifiedPoints = player.n.intensifiedPoints.div(this.cost)},
            currencyLayer: 'n',
            currencyInternalName: 'intensifiedPoints',
            currencyDisplayName:'intensified points',
            unlocked() {return hasUpgrade('n', 24)}
        },
        32: {
            title: "Magic Eight",
            description() {return "Auto buy max Intensified Dimension VIII and raise effective purchased Intensified Dimension VII amount to the power of ^8."},
            cost: new Decimal("eeeee250"),
            canAfford() {return player.n.intensifiedPoints.gte(this.cost)},
            pay() {player.n.intensifiedPoints = player.n.intensifiedPoints.div(this.cost)},
            currencyLayer: 'n',
            currencyInternalName: 'intensifiedPoints',
            currencyDisplayName:'intensified points',
            unlocked() {return hasUpgrade('n', 31)}
        },
        33: {
            title: "Nonexistent Nine",
            description() {return "Auto buy max Intensified Dimension IX and make the intensified point effect 9^x. Effect: ^" + format(Decimal.pow(9, player.n.intensifiedPoints))},
            cost: new Decimal("eeeeee100"),
            canAfford() {return player.n.intensifiedPoints.gte(this.cost)},
            pay() {player.n.intensifiedPoints = player.n.intensifiedPoints.div(this.cost)},
            currencyLayer: 'n',
            currencyInternalName: 'intensifiedPoints',
            currencyDisplayName:'intensified points',
            unlocked() {return hasUpgrade('n', 32)}
        },
        34: {
            title: "Further Enhancement",
            description() {return "Unlock the final layer."},
            cost: new Decimal(1000),
            canAfford() {return player.n.points.gte(this.cost)},
            unlocked() {return hasUpgrade('n', 33)}
        }
    },

    doReset(resettingLayer) {
        let keep = ['milestones']
        let keptUpgrades = []

        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)

        player[this.layer].upgrades.push(...keptUpgrades)
    },

    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        "milestones",
        ["display-text", () => {if (hasMilestone('n', 1)) return `You have ${format(player.n.intensifiedPoints)} intensified points, which directly translate to an exponent to effective intensifiers`}],
        "blank",
        "buyables",
        "blank",
        "upgrades"
    ],

    hotkeys: [
        {key: "N", description: "N: Reset for intensifiers", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    update(diff) {
        if (hasMilestone('n', 1)) player.n.intensifiedPoints = player.n.intensifiedPoints.mul(player.n.intensifiedDimensions[0].pow(buyableEffect('n', 11)).pow(diff))
        if (hasMilestone('n', 2)) player.n.intensifiedDimensions[0] = player.n.intensifiedDimensions[0].mul(player.n.intensifiedDimensions[1].pow(buyableEffect('n', 12).pow(diff)))
        if (hasMilestone('n', 3)) player.n.intensifiedDimensions[1] = player.n.intensifiedDimensions[1].mul(player.n.intensifiedDimensions[2].pow(buyableEffect('n', 13).pow(diff)))
        if (hasMilestone('n', 4)) player.n.intensifiedDimensions[2] = player.n.intensifiedDimensions[2].mul(player.n.intensifiedDimensions[3].pow(buyableEffect('n', 21).pow(diff)))
        if (hasMilestone('n', 5)) player.n.intensifiedDimensions[3] = player.n.intensifiedDimensions[3].mul(player.n.intensifiedDimensions[4].pow(buyableEffect('n', 22).pow(diff)))
        if (hasMilestone('n', 6)) player.n.intensifiedDimensions[4] = player.n.intensifiedDimensions[4].mul(player.n.intensifiedDimensions[5].pow(buyableEffect('n', 23).pow(diff)))
        if (hasMilestone('n', 7)) player.n.intensifiedDimensions[5] = player.n.intensifiedDimensions[5].mul(player.n.intensifiedDimensions[6].pow(buyableEffect('n', 31).pow(diff)))
        if (hasMilestone('n', 8)) player.n.intensifiedDimensions[6] = player.n.intensifiedDimensions[6].mul(player.n.intensifiedDimensions[7].pow(buyableEffect('n', 32).pow(diff)))
        if (hasMilestone('n', 9)) player.n.intensifiedDimensions[7] = player.n.intensifiedDimensions[7].mul(player.n.intensifiedDimensions[8].pow(buyableEffect('n', 33).pow(diff)))
        
        if (hasMilestone('n', 4)) player.n.ID4Exp = player.n.ID4Exp.mul(player.n.intensifiedDimensions[3].pow(buyableEffect('n', 21)).pow(diff))
        if (hasMilestone('n', 7)) player.n.ID7Exp = player.n.ID7Exp.mul(player.n.intensifiedDimensions[6].pow(buyableEffect('n', 31)).pow(diff))

        if (hasMilestone('n', 5)) { // buy max row 1 IDs
            let buy1 = player.n.intensifiedPoints.add(1).log(10).add(1).log(10)
            setBuyableAmount('n', 11, buy1)
            let buy2 = player.n.intensifiedPoints.add(1).log(10).add(1).log(10).div(2)
            setBuyableAmount('n', 12, buy2)
            let buy3 = player.n.intensifiedPoints.add(1).log(10).add(1).log(10).div(3)
            setBuyableAmount('n', 13, buy3)
        }
        if (hasMilestone('n', 8)) {
            let buy4 = player.n.intensifiedPoints.add(1).log(100).div(50).add(1).log(10).add(1).log(10)
            setBuyableAmount('n', 21, buy4)
            let buy5 = player.n.intensifiedPoints.add(1).log(1000).div(100).add(1).log(10).add(1).log(10)
            setBuyableAmount('n', 22, buy5)
            let buy6 = player.n.intensifiedPoints.add(1).log(10000).div(1e42).add(1).log(10).add(1).log(10)
            setBuyableAmount('n', 23, buy6)
        }
        if (hasUpgrade('n', 31)) {
            let buy7 = player.n.intensifiedPoints.add(1).log(11).div(100).add(1).log(10).add(1).log(10).add(1).log(10)
            setBuyableAmount('n', 31, buy7)
        }
        if (hasUpgrade('n', 32)) {
            let buy8 = player.n.intensifiedPoints.add(1).log(10).add(1).log(10).add(1).log(10).add(1).log(10).add(1).log(10).sub(2)
            setBuyableAmount('n', 32, buy8)
        }
        if (hasUpgrade('n', 33)) {
            let buy9 = player.n.intensifiedPoints.add(1).log(10).add(1).log(10).add(1).log(10).add(1).log(10).add(1).log(10).add(1).log(10).sub(3)
            setBuyableAmount('n', 33, buy9)
        }
        if (hasMilestone('f', 0)) setBuyableAmount('n', 33, Decimal.tetrate(10, tmp.f.effect))
    },

    layerShown() {return player.sb.unlocked || player.n.unlocked}
})
