var expect = require("chai").expect;
var speakerdeck = require("../lib/speakerdeck-scraper");

describe('User', function(){
    it('should have user data', function(done){
        speakerdeck.getUser("patrickhamann").then(function(data){
            expect(data.user).to.be.a('object');
            expect(data.user.id).to.be.a('string');
            expect(data.user.url).to.be.a('string');
            expect(data.user.name).to.be.a('string');
            expect(data.user.avatar).to.be.a('string');
            expect(data.user.bio).to.be.a('string');
            done();
        });
    });
    it('should have pagination data', function(done){
        speakerdeck.getUser("patrickhamann").then(function(data){
            expect(data.talks).to.be.a('object');
            expect(data.talks.pages).to.be.a('number');
            expect(data.talks.page).to.be.a('number');
            done();
        });
    });
    it('should have talk data', function(done){
        speakerdeck.getUser("patrickhamann").then(function(data){
            var talk = data.talks.items[0];
            expect(data.talks).to.be.a('object');
            expect(data.talks.items).to.be.a('array');
            expect(data.talks.items.length).to.not.equal(0);
            expect(talk.id).to.be.a('string');
            expect(talk.title).to.be.a('string');
            expect(talk.url).to.be.a('string');
            expect(talk.date).to.be.a('string');
            expect(talk.slides).to.be.a('number');
            expect(talk.thumbnail).to.be.a('string');
            done();
        });
    });
});

describe('Talk', function(){
    it('should have user data', function(done){
        speakerdeck.getTalk("patrickhamann/building-theguardian-dot-com").then(function(data){
            expect(data.user).to.be.a('object');
            expect(data.user.id).to.be.a('string');
            expect(data.user.url).to.be.a('string');
            expect(data.user.name).to.be.a('string');
            expect(data.user.avatar).to.be.a('string');
            done();
        });
    });
    it('should have talk data', function(done){
        speakerdeck.getTalk("patrickhamann/building-theguardian-dot-com").then(function(data){
            expect(data.id).to.be.a('string');
            expect(data.title).to.be.a('string');
            expect(data.description).to.be.a('string');
            expect(data.category).to.be.a('string');
            // expect(data.url).to.be.a('string');
            expect(data.stars).to.be.a('number');
            expect(data.views).to.be.a('number');
            expect(data.date).to.be.a('string');
            expect(data.embed).to.be.a('string');
            expect(data.download).to.be.a('string');
            expect(data.thumbnail).to.be.a('string');
            done();
        });
    });
});
