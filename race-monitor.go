package main

import (
	"log"
	"strconv"

	"github.com/redis/go-redis/v9"
)

func (a *App) connectToDB() error {
	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "student",
		DB:       0,
	})
	defer client.Conn().Close()

	pong, err := client.Ping(a.ctx).Result()
	if err != nil {
		log.Printf("Error connecting to Redis: %s", err.Error())
		return err
	}
	log.Printf("Connected to Redis: %s\n", pong)

	a.redisClient = client
	return nil
}

func (a *App) createDefaultAthletes() error {
	scoreTable := make(map[string]string, len(a.defaultReferees))
	for _, referee := range a.defaultReferees {
		scoreTable[referee] = "0"
	}

	for _, athlete := range a.defaultAthletes {
		err := a.redisClient.HMSet(a.ctx, athlete, scoreTable).Err()
		if err != nil {
			log.Printf("Error creating default athletes: %s", err.Error())
			return err
		}
	}
	log.Printf("Created default athletes %v with score table %v", a.defaultAthletes, scoreTable)

	return nil
}

func (a *App) IncreaseAthleteScoreBy(athlete, referee, increment string) error {
	n, err := strconv.Atoi(increment)
	if err != nil {
		log.Printf("Error converting increment to int : %s", err.Error())
		return err
	}

	err = a.redisClient.HIncrBy(a.ctx, athlete, referee, int64(n)).Err()
	if err != nil {
		log.Printf("Error increasing athlete score: %s", err.Error())
		return err
	}
	log.Printf("Score for %s increased by %s by referee %s\n", athlete, increment, referee)

	return nil
}

func (a *App) GetAthleteTotalScore(athlete string) (int, error) {
	log.Println(athlete)

	scoreTable, err := a.redisClient.HGetAll(a.ctx, athlete).Result()
	if err != nil {
		log.Printf("Error getting score table: %s", err.Error())
		return 0, err
	}
	log.Printf("Got score table of %s: %v", athlete, scoreTable)

	var totalScore int
	for _, score := range scoreTable {
		n, err := strconv.Atoi(score)
		if err != nil {
			log.Printf("Error converting int to string: %s", err.Error())
			return 0, err
		}
		totalScore += n
	}
	log.Printf("Total score of %s is %d", athlete, totalScore)

	return 0, nil
	// return totalScore, nil
}

func (a *App) ServeDefaultAthletes() *[]string {
	return &a.defaultAthletes
}

func (a *App) ServeDefaultReferees() *[]string {
	return &a.defaultReferees
}
