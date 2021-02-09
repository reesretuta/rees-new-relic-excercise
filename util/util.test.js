const util = require("./util");

describe('util', () => {
    it('should ignore puncutation and special characters', () => {
        expect(util.cleanupContent("shouldn't")).toEqual('shouldnt');
        expect(util.cleanupContent("test$with!special@chars")).toEqual('testwithspecialchars');
        expect(util.cleanupContent("end sentence. next sentence")).toEqual('end sentence next sentence');
        expect(util.cleanupContent("I love\nsandwiches.")).toEqual('i love sandwiches');
        expect(util.cleanupContent("(I LOVE SANDWICHES!!)")).toEqual('i love sandwiches');
    });

    it('should ignore case', () => {
        expect(util.cleanupContent("CAPS")).toEqual('caps');
    });

    it('should ingnore new lines', () => {
        expect(util.cleanupContent("new \n line")).toEqual('new line');
    });

    it('should treat multiple spaces as one', () => {
        expect(util.cleanupContent("extra    spaces")).toEqual('extra spaces');
    });

    it('should count simple word combinations as expected', () => {
        let test = "1 2 3, 1 2 3, 1 2 3";
        let answer = [
            {"combo": "1_2_3", "count": 3},
            {"combo": "2_3_1", "count": 2},
            {"combo": "3_1_2", "count": 2}];

        expect(util.getRankedWordCombos(test)).toEqual(answer);
    });

    it('should count word combinations as expected', () => {
        let test = "taking my dog, to the park for a walk. taking my bird, to the park for a walk.  taking my bird to the vet, for a walk";
        let answer = [
            {"combo": "for_a_walk", "count": 3},
            {"combo": "to_the_park", "count": 2},
            {"combo": "the_park_for", "count": 2},
            {"combo": "park_for_a", "count": 2},
            {"combo": "a_walk_taking", "count": 2},
            {"combo": "walk_taking_my", "count": 2},
            {"combo": "taking_my_bird", "count": 2},
            {"combo": "my_bird_to", "count": 2},
            {"combo": "bird_to_the", "count": 2},
            {"combo": "taking_my_dog", "count": 1},
            {"combo": "my_dog_to", "count": 1},
            {"combo": "dog_to_the", "count": 1},
            {"combo": "to_the_vet", "count": 1},
            {"combo": "the_vet_for", "count": 1},
            {"combo": "vet_for_a", "count": 1}];

        expect(util.getRankedWordCombos(test)).toEqual(answer);
    });
});