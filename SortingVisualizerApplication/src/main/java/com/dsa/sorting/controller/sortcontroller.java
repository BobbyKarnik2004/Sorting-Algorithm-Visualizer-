package com.dsa.sorting.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dsa.sorting.service.sortingservice;

@RestController
@RequestMapping("/api/sort")
@CrossOrigin

public class sortcontroller {

	@PostMapping
    public List<List<Integer>> sortArray(@RequestBody List<Integer> arr,
                                   @RequestParam String algo) {
        switch (algo.toLowerCase()) {
            case "bubble":
                return sortingservice.bubbleSortSteps(new ArrayList<>(arr));
            case "quick":
                return sortingservice.quickSortSteps(new ArrayList<>(arr));
            case "insertion":
                return sortingservice.insertionSortSteps(new ArrayList<>(arr));
            case "selection":
                return sortingservice.selectionSortSteps(new ArrayList<>(arr));
            case "merge":
                return sortingservice.mergeSortSteps(new ArrayList<>(arr));
            case "heap":
                return sortingservice.heapSortSteps(new ArrayList<>(arr));
            default:
                throw new IllegalArgumentException("Unsupported algorithm: " + algo);
        }
    }
	
}
